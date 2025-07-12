export const buildAttributeValue = (value) => {
  if (value === null || value === undefined) {
    return { NULL: true };
  }
  if (typeof value === 'string') {
    return { S: value };
  }
  if (typeof value === 'number') {
    return { N: value.toString() };
  }
  if (typeof value === 'boolean') {
    return { BOOL: value };
  }
  if (Array.isArray(value)) {
    return {
      L: value.map((item) => buildAttributeValue(item)),
    };
  }
  if (value instanceof Set) {
    const first = [...value][0];
    if (typeof first === 'string') {
      return { SS: [...value] };
    } else if (typeof first === 'number') {
      return { NS: [...value].map((v) => v.toString()) };
    }
  }
  if (typeof value === 'object') {
    const M = {};
    for (const [k, v] of Object.entries(value)) {
      M[k] = buildAttributeValue(v);
    }
    return { M };
  }
  throw new Error(`Unsupported type: ${typeof value}`);
};
