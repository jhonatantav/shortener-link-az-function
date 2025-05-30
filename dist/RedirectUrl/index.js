"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../ShortenUrl/database");
const httpTrigger = async function (context, req) {
    const shortId = context.bindingData.shortId;
    const originalUrl = (0, database_1.getOriginalUrl)(shortId);
    if (originalUrl) {
        context.res = {
            status: 302,
            headers: {
                Location: originalUrl
            }
        };
    }
    else {
        context.res = {
            status: 404,
            body: "URL não encontrada"
        };
    }
};
exports.default = httpTrigger;
