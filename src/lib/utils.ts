export const parseResourceId = <T = { [key: string]: any }>(
  resourceId: string
) => {
  const segments = resourceId.substr(1).split("/");
  const value = {} as T;
  for (let i = 0; i < segments.length; i += 2) {
    (value as any)[segments[i]] = segments[i + 1];
  }

  return value;
};

export const groupBy = <T>(list: T[], keySelector: (item: T) => string) => {
  const result = new Map<string, T[]>();
  for (const item of list) {
    const key = keySelector(item);
    result.set(key, [...(result.get(key) || []), item]);
  }
  return result;
};
