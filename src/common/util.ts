export const arrPartition = (array: any[], cond: any) => {
  const matches = [];
  const nonMatches = [];

  array.forEach((element) =>
    (cond(element) ? matches : nonMatches).push(element),
  );

  return [matches, nonMatches];
};
