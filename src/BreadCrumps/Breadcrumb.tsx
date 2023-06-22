import { Link, useLocation } from 'react-router-dom'
import "../BreadCrumbstyle/style.scss"

function Breadcrumbs() {
  const location = useLocation();

  return (
    <nav className='breadcrumb'>
      <Link to="/"
        className={location.pathname === "/" ? "breadcrumb-active" : "breadcrumb-not-active"}
      >
        Home
      </Link>
      <span className="breadcrumb-arrow">&gt;</span>
      <Link to="/products"
        className={location.pathname.startsWith("/products") ? "breadcrumb-active" : "breadcrumb-not-active"}
      >
        Products
      </Link>
      {/* <span className="breadcrumb-arrow">&gt;</span> */}
      {/* <Link to="/products/1"
        className={location.pathname === "/products/1" ? "breadcrumb-active" : "breadcrumb-not-active"}
      >
        Product 
      </Link> */}
    </nav>
  );
}

export default Breadcrumbs;