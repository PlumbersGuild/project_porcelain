import { Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import "./App.css";
import SingleBookPage from "./pages/singleBookPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<BooksPage />} />
        <Route path="/books/:id" element={<SingleBookPage />} />
      </Routes>
    </>
  );
}

export default App;
