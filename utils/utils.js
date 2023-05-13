export const keyExtractor = (title, id) => {
  const modifiedTitle = title.toLowerCase().trim().replaceAll(" ", "_");

  return `${modifiedTitle}_${id}`;
};
