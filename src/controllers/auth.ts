import type { RequestHandler } from "express";
import { z } from "zod";
import * as auth from "../services/auth"

export const login: RequestHandler = (req, res) => {
   const loginSchema = z.object({
      password: z.string()
   });
   const body = loginSchema.safeParse(req.body)
   if(!body.success) return res.json({error: 'Dados inválidos'})

  // Validar a senha & gerar o token 
  if(!auth.validatePassword(body.data.password)) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  // Retorno da requisição
  res.json({ token: auth.createToken() });
}

// Middleware de validação de token
export const validate: RequestHandler = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(403).json({ error: 'Acesso Negado' });
  }

  const token = req.headers.authorization.split(' ')[1];
  if(!auth.validateToken(token)) {
    return res.status(403).json({ error: 'Acesso Negado' });
  }
  
  next()
} 
