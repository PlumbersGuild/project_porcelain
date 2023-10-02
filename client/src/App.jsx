import { Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import "./styles/input.scss";
import SingleBookPage from "./pages/singleBookPage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/books"} element={<BooksPage />} />
        <Route path={"/books/:id"} element={<SingleBookPage />} />
        <Route path={"/login"} element={<AuthPage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/cart"} element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
