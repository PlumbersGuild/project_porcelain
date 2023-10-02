import { useState } from "react";
import {
	useLoginMutation,
	useRegisterMutation,
} from "../../reducers/auth";

/**
 * AuthForm allows a user to either login or register for an account.
 */
function AuthForm() {
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isLogin, setIsLogin] = useState(true);
	const authType = isLogin ? "Login" : "Register";
	const oppositeAuthCopy = isLogin
		? "Don't have an account?"
		: "Already have an account?";
	const oppositeAuthType = isLogin ? "Register" : "Login";

	/**
	 * Send credentials to server for authentication
	 */
	async function attemptAuth(event) {
		event.preventDefault();
		setError(null);

		const authMethod = isLogin ? login : register;
		const credentials = { username, password };

		try {
			setLoading(true);
			await authMethod(credentials).unwrap();
		} catch (error) {
			setLoading(false);
			setError(error.data);
		}
	}

	return (
		<>
			<div>
				<h1>{authType}</h1>
				<form
					onSubmit={attemptAuth}
					name={authType}>
					{isLogin ? (
						<>
							<label>Username</label>
							<input
								type="text"
								name="username"
								placeholder="username"
								onChange={(event) => {
									setUsername(event.target.value);
								}}
							/>
							<label>Password</label>
							<input
								type="password"
								name="password"
								placeholder="password"
								onChange={(event) => {
									setPassword(event.target.value);
								}}
							/>
							<button>{authType}</button>
						</>
					) : (
						<>
							<label>Email</label>
							<input
								type="email"
								name="email"
								placeholder="Email Address"
								onChange={(event) => {
									setEmail(event.target.value);
								}}
							/>
							<label>Username</label>
							<input
								type="text"
								name="username"
								placeholder="username"
								onChange={(event) => {
									setUsername(event.target.value);
								}}
							/>
							<label>Password</label>
							<input
								type="password"
								name="password"
								placeholder="password"
								onChange={(event) => {
									setPassword(event.target.value);
								}}
							/>
						</>
					)}
				</form>
				<p>
					{oppositeAuthCopy}{" "}
					<a
						onClick={() => {
							setIsLogin(!isLogin);
						}}>
						{oppositeAuthType}
					</a>
				</p>
				{loading && <p>Logging in...</p>}
				{error && <p>{error}</p>}
			</div>
		</>
	);
}

export default AuthForm;
