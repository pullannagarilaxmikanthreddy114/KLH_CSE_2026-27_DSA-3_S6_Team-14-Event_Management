function levenshteinDistance(a, b) {
  const matrix = Array.from(
    { length: b.length + 1 },
    () => Array(a.length + 1).fill(0)
  );

  for (let i = 0; i <= b.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] =
          matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function fuzzyMatch(query, text) {
  if (!query.trim()) return true;

  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();

  if (t.includes(q)) return true;

  return t.split(/\s+/).some((word) => {
    const distance = levenshteinDistance(q, word);

    return (
      distance <=
      Math.max(1, Math.floor(q.length / 3))
    );
  });
}

export default fuzzyMatch;