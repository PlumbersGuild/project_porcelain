import "../styles/input.scss";
import { useLogoutMutation } from "../reducers/auth";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartItemsQuery } from "../reducers/cart";
import logo from "../assets/logo-no-background.png";
import { useEffect } from "react";

function Nav() {
  const [logout] = useLogoutMutation();
  const user = useSelector((state) => state.auth.credentials?.token);
  const dispatch = useDispatch();
  const { currentData, isLoading } = useGetCartItemsQuery();

  // useEffect(() => {}, []);

  // console.log(`user: `, user);

  // if (!user) {
  // 	window.localStorage.setItem("cart", "test");
  // }

  const cart = useSelector((state) => state.cart?.cart) || [];

  //   if (cart.length === 0) {
  //     return <div>Empty Cart</div>;
  //   }

  // console.log(`cart2: `, cart);

  return (
    <nav>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="navBar">
        <Link className="navLink" to={"/"}>
          Home
        </Link>
        <span>{"|"}</span>

        <Link className="navLink" to={"/about"}>
          About
        </Link>
        <span>{"|"}</span>
        <Link className="navLink" to={"/books"}>
          Shop
        </Link>
        <span>{"|"}</span>
        {!user ? (
          <Link className="navLink" to={"/login"}>
            Login
          </Link>
        ) : (
          <Link to={"/"} className="navLink" onClick={logout}>
            Logout
          </Link>
        )}
        <Link className="cartLink" to={"/cart"}>
          <button className="cartBtn">
            <svg
              className="cartImg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <div className="cartContent">Cart ({cart.length})</div>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
