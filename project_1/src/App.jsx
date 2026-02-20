import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchMeals from "./pages/SearchMeals";
import MealDetails from "./pages/MealDetails";
import Categories from "./pages/Categories";
import LikedMeals from "./pages/LikedMeals";
import { useState } from "react";
import { getLikedMeals } from "./utils/localStorage";

function App() {
  const [likedCount, setLikedCount] = useState(getLikedMeals().length);

  return (
    <>
      <Navbar likedCount={likedCount} />
      <Routes>
        <Route path="/" element={<SearchMeals setLikedCount={setLikedCount} />} />
        <Route path="/meal/:id" element={<MealDetails setLikedCount={setLikedCount} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/liked" element={<LikedMeals setLikedCount={setLikedCount} />} />
      </Routes>
    </>
  );
}

export default App;