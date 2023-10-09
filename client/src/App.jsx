import { Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import "./styles/input.scss";
import SingleBookPage from "./pages/SingleBookPage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const adminUser =
    window.sessionStorage.key("user") &&
    JSON.parse(window.sessionStorage.getItem("user"));
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/books"} element={<BooksPage />} />
        <Route path={"/books/:id"} element={<SingleBookPage />} />
        <Route path={"/login/*"} element={<AuthPage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/cart"} element={<CartPage />} />
        <Route path={"/checkout"} element={<CheckoutPage />} />
        {/* <Route path={"/admin"} element={<AdminPage />} /> */}
        {window.sessionStorage.key("user") && adminUser.isAdmin === true ? (
          <Route path="/admin" element={<AdminPage />} />
        ) : (
          <></>
        )}
      </Routes>
    </>
  );
}

export default App;
