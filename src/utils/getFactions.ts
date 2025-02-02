export const getFactions = async ({ page }: { page: number }) => {
  const response = await fetch(
    `https://api.spacetraders.io/v2/factions?page=${page}&limit=20`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
