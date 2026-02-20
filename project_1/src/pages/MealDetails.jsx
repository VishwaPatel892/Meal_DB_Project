import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLikedMeals, saveLikedMeals } from "../utils/localStorage";

function MealDetails({ setLikedCount }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  const handleLike = () => {
    const liked = getLikedMeals();
    if (!liked.includes(meal.idMeal)) {
      liked.push(meal.idMeal);
      saveLikedMeals(liked);
      setLikedCount(liked.length);
    }
  };

  const ingredients = [];
  for (let i = 1; i <= 5; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(meal[`strIngredient${i}`]);
    }
  }

return (
  <div className="container page">
    <img src={meal.strMealThumb} width="300" />
    
    <h2>{meal.strMeal}</h2>
    
    <p><b>Category:</b> {meal.strCategory}</p>
    <p><b>Area:</b> {meal.strArea}</p>
    
    <p>{meal.strInstructions.substring(0, 200)}...</p>

    <h4>Ingredients:</h4>
    <ul>
      {ingredients.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <button className="like-btn" onClick={handleLike}>
      Like
    </button>
  </div>
);
}

export default MealDetails;