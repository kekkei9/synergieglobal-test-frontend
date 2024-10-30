import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateShortUrl } from "@/services/backend/UrlController";
import { copyToClipboard } from "@/utils/input";
import { URL_REGEX } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "@mynaui/icons-react";
import clsx from "clsx";
import React, { BaseSyntheticEvent, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ShortenUrlSchema = z.object({
  longUrl: z
    .string()
    .min(1, "Long URL is required")
    .regex(URL_REGEX, "Invalid URL"),
  password: z
    .string()
    .refine((value) => value.length === 0 || value.length >= 6, {
      message: "String must be either empty or at least 6 characters long.",
    }),
  customShortCode: z.string(),
});

type ShortenUrlSchemaType = z.infer<typeof ShortenUrlSchema>;

const shortenUrlFormFields: {
  name: keyof ShortenUrlSchemaType;
  placeholder: string;
}[] = [
  {
    name: "longUrl",
    placeholder: "Enter long url",
  },
  {
    name: "password",
    placeholder: "Enter password protection (optional)",
  },
  {
    name: "customShortCode",
    placeholder: "Enter custom short code (optional)",
  },
];

const HomePage = () => {
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ShortenUrlSchemaType>({
    resolver: zodResolver(ShortenUrlSchema),
  });
  const [shortUrl, setShortUrl] = useState("");

  const onSubmit = async (
    values: ShortenUrlSchemaType,
    event?: BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    const { data: response } = await generateShortUrl(values);
    setShortUrl(response.shortUrl);
  };

  const onClickCopyShortUrl = () => {
    copyToClipboard(shortUrl);
    toast({
      title: "Short url copied to clipboard",
    });
  };

  return (
    <div className="w-full flex flex-col items-center p-4 gap-2">
      <div className="font-semibold text-2xl">Link shorter</div>
      <form
        className="grid w-full items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {shortenUrlFormFields.map(({ name, placeholder }) => (
          <Fragment key={name}>
            <Input
              type="text"
              {...register(name)}
              placeholder={placeholder}
              className={clsx(errors[name] && "border-red-600")}
            />
            {!!errors[name] && (
              <p className="text-xs font-medium text-red-600">
                {errors[name].message}
              </p>
            )}
          </Fragment>
        ))}

        <Button type="submit">Click here to get short url</Button>
      </form>
      {!!shortUrl.length && (
        <div className="flex flex-col items-center shadow rounded-sm p-4 gap-3 mt-4">
          <div className="text-xl font-semibold">Generated short url</div>
          <div className="flex gap-2">
            <a href={shortUrl}>{shortUrl}</a>
            <Copy onClick={onClickCopyShortUrl} className="cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
