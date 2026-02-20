import { Link } from "react-router-dom";
import { getLikedMeals, saveLikedMeals } from "../utils/localStorage";

function MealCard({ meal, setLikedCount }) {

  const handleLike = () => {
    const liked = getLikedMeals();

    if (!liked.includes(meal.idMeal)) {
      liked.push(meal.idMeal);
      saveLikedMeals(liked);
      setLikedCount(liked.length);
    }
  };

  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <p>{meal.strCategory}</p>

      <button className="like-btn" onClick={handleLike}>
        Like
      </button>

      <Link to={`/meal/${meal.idMeal}`}>
        <button className="details-btn">View Details</button>
      </Link>
    </div>
  );
}

export default MealCard;