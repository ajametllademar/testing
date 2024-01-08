const siteURL: string =
    process.env.SITE_URL || process.env.VERCEL_URL || "http://localhost:3012";
const dev: boolean = process.env.NODE_ENV !== "production";
const sessionMaxAge: number = Number(
    process.env.NEXTAUTH_SESSION_MAX_AGE || 30 * 24 * 60 * 60,
);
const buildID: number = Number(process.env.BUILD_ID) || new Date().getTime();
const version: string = require("../../package.json").version;
const strapiURL: string = process.env.STRAPI_URL || "http://localhost:1337";
const strapiToken: string = process.env.STRAPI_TOKEN || "";
const telegramBotToken: string = process.env.TELEGRAM_BOT_TOKEN || "";

export {
    dev,
    sessionMaxAge,
    buildID,
    version,
    siteURL,
    strapiURL,
    strapiToken,
    telegramBotToken,
};
