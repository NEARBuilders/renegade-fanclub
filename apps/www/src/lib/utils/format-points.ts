export const formatPoints = (points: number): string => {
  if (points >= 1_000_000_000) {
    return `${(points / 1_000_000_000).toFixed(2).replace(/\.00$/, "")}B`;
  }
  if (points >= 1_000_000) {
    return `${(points / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  }
  if (points >= 1_000) {
    return `${(points / 1_000).toFixed(2).replace(/\.00$/, "")}K`;
  }
  return points.toString();
};
