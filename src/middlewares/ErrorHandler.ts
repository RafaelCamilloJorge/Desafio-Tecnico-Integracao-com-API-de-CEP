import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError'; // Ajuste o caminho se necessário

export function errorHandler(
  err: Error, // Alterado para 'any'
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err); // Log de erros não esperados para depuração

  return response.status(500).json({
    status: 'fail',
    message: 'Erro interno do servidor',
  });
}