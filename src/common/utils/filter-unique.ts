export function filterUnique<T, K>(
  arrayT: T[],
  arrayK: K[],
  keySelector: (item: T | K) => string,
): K[] {
  return arrayK.filter(
    (itemK) =>
      !arrayT.some((itemT) => keySelector(itemT) === keySelector(itemK)),
  );
}
