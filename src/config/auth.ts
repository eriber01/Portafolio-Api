require("dotenv").config();
import jwt from "jsonwebtoken";

export const APP_SECRET = process?.env?.SECRET_TOKEN || "";

export const createToken = (id: number, userName: string) => {
  const token = jwt.sign(
    {
      id,
      userName,
    },
    APP_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

export const validateExpireToken = (token: string) => {
  try {
    const validate = jwt.verify(token, APP_SECRET);
    console.log("El token sigue vivo");
 
    return true;
  } catch (error) {
    console.log("el token esta vencido");
    return false;
  }
};
