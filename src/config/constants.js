require("dotenv").config();

console.log("WHAT IS ENV", process.env.PORT);

export const apiUrl = process.env.API_URL;
export const DEFAULT_MESSAGE_TIMEOUT = 3000;
export const DEFAULT_PAGINATION_LIMIT = 10;