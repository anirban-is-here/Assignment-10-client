// RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// your Firebase config

import useAuth from "../../hooks/useAuth";
import api from "../../hooks/useAxios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, signInGoogle, updateUserProfile, setLoading } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createUser(email, password);
      await updateUserProfile(name, image);
      setLoading(false);
      const user = res.user;
      const newUser = {
        _id: user.uid,
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
      };

      // add to db
      try {
        api.post("/users", newUser).then(console.log("user added in db"));
      } catch {
        (err) => console.log(err);
      }

      navigate("/home");
    } catch (error) {
      console.log(error);
    }

    // navigate to Home after registration
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-base-200">
        <h2 className="text-2xl font-bold mb-3 text-primary text-center">Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4 ">
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="input placeholder:text-gray-400 focus:ring-2 focus:ring-primary textarea-bordered input-primary bg-base-200 text-base-content w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input placeholder:text-gray-400 focus:ring-2 focus:ring-primary textarea-bordered input-primary bg-base-200 text-base-content w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="">Photo Url</label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input placeholder:text-gray-400 focus:ring-2 focus:ring-primary textarea-bordered input-primary bg-base-200 text-base-content w-full"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input placeholder:text-gray-400 focus:ring-2 focus:ring-primary textarea-bordered input-primary bg-base-200 text-base-content w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        {/* GOOGLE LOGIN */}
        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]  text-md mb-2 w-full">
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

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
