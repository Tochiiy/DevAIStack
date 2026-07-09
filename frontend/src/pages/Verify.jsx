import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

const Verify = () => {
  return (
    <div className="px-4 pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        <FiMail size={48} className="mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          A verification link has been sent to your email. Click the link to
          activate your account.
        </p>
        <Link to="/login" className="text-yellow-500 hover:underline text-sm">
          Go to login
        </Link>
      </div>
    </div>
  );
};

export default Verify;
