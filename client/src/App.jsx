import { Route, Routes } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import "./App.css";

function App() {
	return (
		<>
			<Routes>
				<Route
					index
					element={<BooksPage />}
				/>
			</Routes>
		</>
	);
}

export default App;
