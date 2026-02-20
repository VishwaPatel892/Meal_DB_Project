import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container page">
      <h2>Meal Categories</h2>

      {loading && <p>Loading categories...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {categories.map((cat) => (
            <div key={cat.idCategory} className="card">
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
              />
              <h3>{cat.strCategory}</h3>
              <p>
                {cat.strCategoryDescription
                  ? cat.strCategoryDescription.substring(0, 120) + "..."
                  : "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;