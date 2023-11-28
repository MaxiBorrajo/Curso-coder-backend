import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateToken(data) {
  const token = await jwt.sign(data, process.env.JWT_SECRET);

  return token;
}

export { __dirname, generateToken };
