import { RequestHandler } from "express";

export const requestInterceptor: RequestHandler = (req, res, next) => {
  // Log the request method and URL
  console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
   
  // Proceed to the next middleware or route handler
  next();
} 