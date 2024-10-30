import { getOriginalUrl } from "@/services/backend/UrlController";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShortUrlPage = () => {
  const { shortUrlId } = useParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectToOriginal = async () => {
      if (!shortUrlId) {
        //error throw here
        return;
      }

      try {
        const response = await getOriginalUrl(shortUrlId);

        if (response.status === 200) {
          window.location.href = response.data.originalUrl;
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.message);
        }
      }
    };
    redirectToOriginal();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {error ? (
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
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
