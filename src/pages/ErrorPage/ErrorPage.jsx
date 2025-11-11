import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-10 rounded-2xl shadow-xl bg-base-100 max-w-lg w-full"
      >
        <h1 className="text-6xl font-extrabold text-error">404</h1>
        <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>

        <p className="mt-3 text-base text-neutral/70">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {error?.statusText || error?.message ? (
          <p className="mt-4 text-sm text-error/80 italic">
            {error.statusText || error.message}
          </p>
        ) : null}

        <Link to="/" className="btn btn-primary mt-6">
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
