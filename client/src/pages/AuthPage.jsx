import AuthForm from "../components/authForm/AuthForm";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Home";

function AuthPage() {
  const me = useSelector((state) => state.auth.credentials.token);

  const guestRouter = (
    <Routes>
      <Route path="/*" element={<AuthForm />} />
    </Routes>
  );

  const userRouter = (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );

  return me ? userRouter : guestRouter;
}

export default AuthPage;
