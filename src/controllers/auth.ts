import type { RequestHandler } from "express";
import { z } from "zod";
import * as auth from "../services/auth"

// Controller to login
export const login: RequestHandler = (req, res) => {
   const loginSchema = z.object({
      password: z.string()
   });
  // Validate the request body
   const body = loginSchema.safeParse(req.body)
   if(!body.success) return res.json({error: 'Dados inválidos'})

  // Validate the password 
  if(!auth.validatePassword(body.data.password)) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  // retourn the token
  res.json({ token: auth.createToken() });
}

// Middleware to validate the token
export const validate: RequestHandler = (req, res, next) => {
  
  if(!req.headers.authorization) {
    return res.status(403).json({ error: 'Acesso Negado' });
  }
  // Extract the token from the Authorization header
  const token = req.headers.authorization.split(' ')[1];
  if(!auth.validateToken(token)) {
    return res.status(403).json({ error: 'Acesso Negado' });
  }
  
  next()
} 
