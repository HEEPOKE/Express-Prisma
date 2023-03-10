import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../../config/db";
import config from "../../config/config";
import comparePassword from "../../common/comparePassword";
import decodedToken from "../../common/decodedToken";
import userServices from "../userServices";

async function checkLogin(email: string, password: string) {
  return db.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
}

async function createToken(user: any, key: string, time: string) {
  const token = await jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    key,
    { expiresIn: `${time}` }
  );

  return token;
}

async function updateRefreshToken(id: number, Token: string) {
  return await db.user.update({
    where: {
      id: id,
    },
    data: {
      refresh: Token,
    },
  });
}

async function login(email: string, password: string, res: Response) {
  const user = await userServices.findEmail(email);
  let massage;

  if (!user) {
    massage = { message: "Invalid email" };
    return res.status(401).json(massage);
  }

  const checkPassword = await comparePassword(user.password, password);

  if (!checkPassword) {
    massage = { message: "Incorrect Password" };
    return res.status(401).json(massage);
  }

  const login = authServices.checkLogin(email, password);

  if (!login) {
    massage = { message: "Incorrect Email or Password" };
    return res.status(401).json(massage);
  }

  const access_token = await createToken(user, `${config.MY_SECRET_KEY}`, "1h");
  const refresh_token = await createToken(user, `${config.MY_REFRESH_KEY}`, "1d");

  await updateRefreshToken(user.id, refresh_token);

  const tokenExp = await decodedToken(access_token);

  const payload = {
    message: "Success",
    payload: user,
    Authorization: `Bearer ${access_token}`, 
    Refresh_token: refresh_token, 
    token_exp: tokenExp, 
  };

  return res.status(200).json(payload); // Moved return statement to end of function for readability and consistency with other functions in codebase.  
}

async function register(payload: any) {
  return await db.user.create({
    data: payload,
  });
}

async function refreshToken(user: any, res: Response) {
  try {
    const User = await db.user.findFirst({
      where: { id: user.id, email: user.email },
    });

    if (!User) {
      return res.status(403).json({ message: "Token Not Correct" });
    }

    const access_token = await createToken(
      user,
      `${config.MY_SECRET_KEY}`,
      "1h"
    );
    const refresh_token = await createToken(
      user,
      `${config.MY_REFRESH_KEY}`,
      "1d"
    );
    const tokenExp = await decodedToken(access_token);

    if (refresh_token) {
      await updateRefreshToken(user.id, refresh_token);
    }

    let payload = {
      Authorization: access_token,
      Refresh_Token: refresh_token,
      Token_Exp: tokenExp,
    };

    return res.status(200).json({ payload });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
}

async function logout(token: string, res: Response) {
  try {
    console.log("====================================");
    console.log(token);
    console.log("====================================");
  } catch (err) {
    return res.status(500).json({ message: "Logout Error" });
  }
}

const authServices = {
  login,
  register,
  checkLogin,
  createToken,
  refreshToken,
  logout,
};

export default authServices;
