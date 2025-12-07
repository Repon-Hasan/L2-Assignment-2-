import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";


export const auth = (...roles:string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const decoded = jwt.verify(token, config.JWT_SECRET!) as JwtPayload;
      console.log(decoded);

    
      (req as any).user = decoded;
      if(roles.length && !roles.includes(decoded.role)){
           return res.status(401).json({
             error: "unauthorized!!!",

           })
      }
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
};
