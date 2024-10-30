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

  return <div>{!!error && <div>{error}</div>}</div>;
};

export default ShortUrlPage;
