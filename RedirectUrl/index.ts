import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getOriginalUrl } from "../ShortenUrl/database";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const shortId = context.bindingData.shortId as string;
  const originalUrl = getOriginalUrl(shortId);

  if (originalUrl) {
    context.res = {
      status: 302,
      headers: {
        Location: originalUrl
      }
    };
  } else {
    context.res = {
      status: 404,
      body: "URL não encontrada"
    };
  }
};

export default httpTrigger;
