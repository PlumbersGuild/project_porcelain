import { Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import "./styles/input.scss";
import SingleBookPage from "./pages/singleBookPage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";

function App() {
  const protectedRoutes = () => {
    return (
      <>
        <Routes></Routes>
      </>
    );
  };
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
