import { NavLink } from "react-router-dom";

function Navbar({ likedCount }) {
  return (
    <nav className="navbar">
      
      {/* 🔥 WEBSITE NAME */}
      <h2 className="logo">MYmealsdb</h2>

      <div className="nav-links">
        <NavLink to="/">Search</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/liked">
          Liked Meals ({likedCount})
        </NavLink>
      </div>

    </nav>
  );
}

export default Navbar;