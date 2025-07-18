// Regra de negócio

import { getToday } from "../utils/getToday"

// Services authentication
export const validatePassword = (password:string): boolean => {
  const currentPassword = getToday().split('/').join('');
  return password === currentPassword;
} 

// Create a token based on the current date
export const createToken = () => {
  const currentPassword = getToday().split('/').join('');
  return `${process.env.DEFAULT_TOKEN}${currentPassword}`
} 

// Validate the token
export const validateToken = (token: string) => {
  const currentPassword = createToken();
  return token === currentPassword
}