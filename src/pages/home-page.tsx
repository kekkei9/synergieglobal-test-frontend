import { copyToClipboard } from "@/utils/input";
import React, { useState } from "react";

const HomePage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  return (
    <div>
      <div>Link shorter</div>
      <input
        placeholder="Input long url here"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button>Click here to get short url</button>
      {shortUrl.length && (
        <div>
          <div>{shortUrl}</div>
          <div onClick={() => copyToClipboard(shortUrl)}>copy</div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
