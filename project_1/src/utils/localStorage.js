export const getLikedMeals = () => {
  const data = localStorage.getItem("likedMeals");
  return data ? JSON.parse(data) : [];
};

export const saveLikedMeals = (ids) => {
  localStorage.setItem("likedMeals", JSON.stringify(ids));
};