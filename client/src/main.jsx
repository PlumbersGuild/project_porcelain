import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/input.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js";
import Nav from "./components/Nav.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Nav />
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
