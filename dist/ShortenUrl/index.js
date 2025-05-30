"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
function generateShortId(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
const httpTrigger = async function (context, req) {
    const { url } = req.body || {};
    if (!url || typeof url !== 'string') {
        context.res = {
            status: 400,
            body: { error: "URL inválida ou ausente." }
        };
        return;
    }
    const shortId = generateShortId();
    (0, database_1.saveMapping)(shortId, url);
    context.res = {
        status: 200,
        body: {
            shortUrl: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}/api/${shortId}`,
            originalUrl: url,
        }
    };
};
exports.default = httpTrigger;
