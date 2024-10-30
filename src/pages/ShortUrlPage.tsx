import { getOriginalUrl } from "@/services/backend/UrlController";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShortUrlPage = () => {
  const { shortUrlId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");

  const redirectToOriginal = async () => {
    if (!shortUrlId) {
      return;
    }

    try {
      const response = await getOriginalUrl(shortUrlId, password);

      if (response.status === 201) {
        window.location.href = response.data.originalUrl;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  useEffect(() => {
    redirectToOriginal();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {error === "Password is required to access this URL" ||
      error === "Incorrect password" ? (
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Password Required
          </h1>
          <p className="text-gray-600 mb-4">
            Please enter the password to access this link.
          </p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={redirectToOriginal}
          >
            Submit
          </button>
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </div>
      ) : error ? (
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Oops!</h1>
          <p className="text-gray-700">{error}</p>
          <p className="text-gray-500 mt-4">
            The link you tried to access may have expired or is invalid.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Go Home
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Redirecting...</p>
      )}
    </div>
  );
};

export default ShortUrlPage;
