export function rankEvents(
  events,
  query = "",
  favorites = []
) {
  return [...events].sort((a, b) => {
    let scoreA = a.featured ? 2 : 0;
    let scoreB = b.featured ? 2 : 0;

    if (favorites.some((item) => item.id === a.id)) {
      scoreA += 3;
    }

    if (favorites.some((item) => item.id === b.id)) {
      scoreB += 3;
    }

    if (query) {
      const q = query.toLowerCase();

      if (a.title.toLowerCase().includes(q)) {
        scoreA += 4;
      }

      if (b.title.toLowerCase().includes(q)) {
        scoreB += 4;
      }
    }

    return scoreB - scoreA;
  });
}

export default rankEvents;