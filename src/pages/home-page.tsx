import { Input } from "@/components/ui/input";
import { generateShortUrl } from "@/services/backend/UrlController";
import { copyToClipboard } from "@/utils/input";
import { isUrl } from "@/utils/validation";
import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Copy } from "@mynaui/icons-react";
import { useToast } from "@/hooks/use-toast";

const HomePage = () => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const debounceSetError = useCallback(
    _.debounce((url: string) => {
      if (!url) {
        setError("Please input url");
      } else if (!isUrl(url)) {
        setError("Please input true url!");
      } else {
        setError(null);
      }
    }, 1000),
    []
  );

  useEffect(() => debounceSetError(longUrl), [longUrl]);

  const getShortUrl = async () => {
    const { data: response } = await generateShortUrl(longUrl);
    setShortUrl(response.shortUrl);
  };

  const onClickCopyShortUrl = () => {
    copyToClipboard(shortUrl);
    toast({
      title: "Short url copied",
    });
  };

  return (
    <div className="w-full flex flex-col items-center p-4 gap-2">
      <div className="font-semibold text-2xl">Link shorter</div>
      <div className="grid w-full items-center gap-2">
        <Input
          type="text"
          placeholder="Enter long url"
          className={clsx(error && "border-red-600")}
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      </div>
      <Button onClick={getShortUrl} disabled={!!error}>
        Click here to get short url
      </Button>
      {!!shortUrl.length && (
        <div className="flex gap-2">
          <a href={shortUrl}>{shortUrl}</a>
          <Copy onClick={onClickCopyShortUrl} className="cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
