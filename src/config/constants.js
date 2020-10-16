require("dotenv").config();

console.log("WHAT IS ENV", process.env.API_URL);

export const apiUrl = "http://localhost:4000";
//or  process.env.API_URL once I have figured this out
export const DEFAULT_MESSAGE_TIMEOUT = 3000;
export const DEFAULT_PAGINATION_LIMIT = 10;