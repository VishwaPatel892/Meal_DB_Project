import { useState, useEffect } from "react";
import MealCard from "../components/MealCard";

function SearchMeals({ setLikedCount }) {
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMeals = async (url) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.log("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
  }, []);

  const handleSearch = () => {
    if (!query) return;
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  };

return (
  <div className="container page">
    <h2>Search Meals</h2>

    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search meal..."
    />
    <button className="details-btn" onClick={handleSearch}>
      Search
    </button>

    {loading && <p>Loading...</p>}

    <div className="grid">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          setLikedCount={setLikedCount}
        />
      ))}
    </div>
  </div>
);
       

}

export default SearchMeals;