import { Url } from "@/types/url";
import { axiosClient } from "../axiosClient";

export const generateShortUrl = (url: string) =>
  axiosClient.post<{ shortUrl: string }>("/urls", {
    url,
  });

export const getOriginalUrl = (shortUrlId: string) =>
  axiosClient.get<Url & { message: string }>(`/urls/${shortUrlId}`);
