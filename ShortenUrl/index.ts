import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { saveMapping } from "./database";

function generateShortId(length = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { url } = req.body || {};

  if (!url || typeof url !== 'string') {
    context.res = {
      status: 400,
      body: { error: "URL inválida ou ausente." }
    };
    return;
  }

  const shortId = generateShortId();
  saveMapping(shortId, url);

  context.res = {
    status: 200,
    body: {
      shortUrl: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}/api/${shortId}`,
      originalUrl: url,
    }
  };
};

export default httpTrigger;
