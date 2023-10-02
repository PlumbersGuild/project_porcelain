import { Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import "./App.css";
import SingleBookPage from "./pages/singleBookPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<BooksPage />} />
        <Route path="/books/:id" element={<SingleBookPage />} />
        <Route path={"/login"} element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
