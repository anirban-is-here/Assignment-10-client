import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";



import api from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

// update path if needed

const Login = () => {
  const navigate = useNavigate();

  const { setLoading, signInUser, signInGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInUser(email, password).then((res) => {
        const user = res.user;
        setLoading(false);
        console.log(user);
      });

      navigate("/"); // redirect home
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInGoogle().then((res) => {
        const user = res.user;
        const newUser = {
          _id: user.uid,
          name: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL || "",
        };
        console.log(newUser);
        setLoading(false);

        try {
          api.post("/users", newUser).then(console.log("user added in db"));
        } catch {
          (err) => console.log(err);
        }
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          Login
        </h2>

        {error && (
          <p className="text-error text-sm mb-3 text-center">{error}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col items-center p-4">
          <div className="form-control mb-3 flex flex-col gap-2 w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="input placeholder:text-gray-400 focus:ring-2 focus:ring-primary textarea-bordered input-primary bg-base-200 text-base-content w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-1 flex flex-col gap-2 w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input focus:ring-2 focus:ring-primary placeholder:text-gray-400 input-bordered input-primary bg-base-200 text-base-content w-full"
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
            >
              Forgot Password?
            </button>
          </label>

          <button className="btn btn-primary w-full mt-2">Login</button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* GOOGLE LOGIN */}
        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] mx-4 text-md mb-2">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-sm">
          Don’t have an account?
          <Link to="/register" className="text-secondary link ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
