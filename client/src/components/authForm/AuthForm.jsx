import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../reducers/auth";
import { useGetCartItemsQuery } from "../../reducers/cart";
import { Link } from "react-router-dom";

/**
 * AuthForm allows a user to either login or register for an account.
 */
function AuthForm() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refetch } = useGetCartItemsQuery();
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
    const credentials = isLogin
      ? { username, password }
      : { username, email, password };

    try {
      setLoading(true);
      await authMethod(credentials)
        .unwrap()
        .then((account) => {
          const { user } = account;
          console.log("account", account);
          console.log("user", user);
          window.sessionStorage.setItem("user", JSON.stringify(user));
          window.localStorage.removeItem("cart");
          // location.reload();
          // refetch();
        });
      //   refetch();
    } catch (error) {
      setLoading(false);
      setError(error.data);
    }
  }

  return (
    <>
      <div className="auth__container">
        <h1>{authType}</h1>
        <form onSubmit={attemptAuth} name={authType}>
          {isLogin ? (
            <>
              <label className="auth__text">Username</label>
              <input
                className="input"
                type="text"
                name="username"
                placeholder="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <label className="auth__text">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <button className="auth__submit">{authType}</button>
            </>
          ) : (
            <>
              <label className="auth__text">Username</label>
              <input
                className="input"
                type="text"
                name="username"
                placeholder="username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <label className="auth__text">Email</label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <label className="auth__text">Password</label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />

              <button className="auth__submit">{authType}</button>
            </>
          )}
        </form>
        <p className="auth__switch">
          {oppositeAuthCopy}{" "}
          <a
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
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
