// RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pwd)) return "Password must include an uppercase letter.";
    if (!/[a-z]/.test(pwd)) return "Password must include a lowercase letter.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const pwdError = validatePassword(password);
    if (pwdError) return setError(pwdError);

    setError("");
    setLoading(true);

    try {
      const res = await createUser(email, password);
      await updateUserProfile(name, image);

      const user = res.user;
      const newUser = {
        _id: user.uid,
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
      };

      api.post("/users", newUser).then(() => console.log("User added in db"));
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
        api.post("/users", newUser).then(() => console.log("User added in db"));
      });
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md bg-base-200">
        <h2 className="text-2xl font-bold mb-3 text-primary text-center">
          Register
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="input w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-white w-full flex items-center justify-center gap-2"
        >
          Google Login
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
