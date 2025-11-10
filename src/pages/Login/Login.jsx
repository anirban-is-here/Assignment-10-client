import { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../../firebase.init";
import { AuthContext } from "../../Contexts/AuthContext";

// update path if needed

const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const { loading, setLoading } = use(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect home
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Enter your email to reset password.");

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && (
          <p className="text-error text-sm mb-3 text-center">{error}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-1">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot password */}
          <label className="label">
            <button
              type="button"
              className="label-text-alt link link-hover text-primary"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </label>

          <button className="btn btn-primary w-full mt-2">Login</button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* GOOGLE LOGIN */}
        <button
          className="btn btn-outline w-full mb-3"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-sm">
          Don’t have an account?
          <Link to="/register" className="text-primary link ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
