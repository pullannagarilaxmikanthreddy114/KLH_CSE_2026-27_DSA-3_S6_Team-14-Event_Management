export function similarity(a = "", b = "") {
  const first = new Set(
    a.toLowerCase().split(/\s+/)
  );

  const second = new Set(
    b.toLowerCase().split(/\s+/)
  );

  const intersection = [...first].filter((word) =>
    second.has(word)
  );

  const union = new Set([
    ...first,
    ...second,
  ]);

  if (union.size === 0) return 0;

  return intersection.length / union.size;
}

export default similarity;