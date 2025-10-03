import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export let encryptPassword = (password: string) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    if (hashedPassword) return hashedPassword;
  } catch (error) {
    console.error("Error While hash password:", error);
    return false;
  }
};

export const verifyPassword = (password: string, hash: string) => {
  let match = bcrypt.compareSync(password, hash);
  return match;
};


export const generateUsername = (emailOrName: string) => {
  let username = "";

  // If the input is an email, take the part before '@'
  if (emailOrName.includes("@")) {
    username = emailOrName.split("@")[0] || "";
  }
  // If the input is a name, remove spaces and convert to lowercase
  else {
    username = emailOrName.replace(/\s+/g, "").toLowerCase();
  }

  // Append a random number (between 100 and 999) to ensure uniqueness
  const randomNumber = Math.floor(Math.random() * 900) + 100; // Random number between 100 and 999
  username += randomNumber;

  return username;
};

export const generate4DigitCode = () => {
  const code = Math.floor(Math.random() * 9000) + 1000;
  return code.toString();
};
