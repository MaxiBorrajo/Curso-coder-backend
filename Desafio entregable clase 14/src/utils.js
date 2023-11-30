import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { response } from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateToken(data) {
  const token = await jwt.sign(data, process.env.JWT_SECRET);

  return token;
}

async function customResponse(res, status, message) {
  return res.status(status).json({ message: message });
}

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export { __dirname, generateToken, customResponse, CustomError };
