import { useEffect, useState } from "react";
import { getLikedMeals, saveLikedMeals } from "../utils/localStorage";

function LikedMeals({ setLikedCount }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedMeals = async () => {
      const ids = getLikedMeals();

      if (ids.length === 0) {
        setMeals([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          ids.map((id) =>
            fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            )
              .then((res) => {
                if (!res.ok) {
                  throw new Error("Failed to fetch meal");
                }
                return res.json();
              })
              .then((data) => data.meals[0])
          )
        );

        setMeals(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedMeals();
  }, []);

  const removeLike = (id) => {
    const updated = getLikedMeals().filter((item) => item !== id);
    saveLikedMeals(updated);
    setLikedCount(updated.length);

    setMeals((prev) =>
      prev.filter((meal) => meal.idMeal !== id)
    );
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading liked meals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="container page">
        <h2>No liked meals yet.</h2>
      </div>
    );
  }

  return (
    <div className="container page">
      <h2>Liked Meals</h2>

      <div className="grid">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="card">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <h3>{meal.strMeal}</h3>
            <p>{meal.strCategory}</p>

            <button
              className="remove-btn"
              onClick={() => removeLike(meal.idMeal)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedMeals;