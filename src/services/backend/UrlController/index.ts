import { Url } from "@/types/url";
import { axiosClient } from "../axiosClient";

export const generateShortUrl = (generateShortUrlPayload: {
  longUrl: string;
  password: string;
  customShortCode: string;
}) => axiosClient.post<{ shortUrl: string }>("/urls", generateShortUrlPayload);

export const getOriginalUrl = (shortUrlId: string, password?: string) =>
  axiosClient.post<Url & { message: string }>(
    `/urls/${shortUrlId}`,
    password ? { password } : undefined
  );
