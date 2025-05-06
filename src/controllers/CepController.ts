// src/controllers/CepController.ts
import { Request, Response } from 'express';
import { CepService } from '../services/CepService';
import { injectable, inject } from 'tsyringe';

@injectable()
export class CepController {
  constructor(
    @inject(CepService)
    private cepService: CepService) { }

  async create(req: Request, res: Response) {
    const cep = await this.cepService.create(req.body);
    res.status(201).json(cep);
  }

  public async get(req: Request, res: Response): Promise<void> {
    const { cep } = req.params;
    try {
      const existingCep = await this.cepService.getCepByCep(cep);
      if (existingCep) {
        res.status(200).json(existingCep);
        return;
      }

      const cepData = await this.cepService.importFromViaCep(cep);
      if (!cepData) {
        res.status(404).json({ message: 'CEP não encontrado' });
        return;
      }
      res.status(200).json(cepData);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o CEP' });
    }
  }

  async update(req: Request, res: Response) {
    await this.cepService.update(req.params.cep, req.body);
    res.json({ message: 'CEP atualizado' });
  }

  async addFavorite(req: Request, res: Response) {
    await this.cepService.addFavorite(req.params.cep);
    res.json({ message: 'CEP favoritado' });
  }

  async removeFavorite(req: Request, res: Response) {
    await this.cepService.removeFavorite(req.params.cep);
    res.json({ message: 'CEP removido dos favoritos' });
  }

  async getAll(req: Request, res: Response) {
    const ceps = await this.cepService.getAll();
    res.json(ceps);
  }

  async importFromViaCep(req: Request, res: Response) {
    const ceps = await this.cepService.importFromViaCep(req.body.cep);
    res.json({ message: 'Importação concluída', ceps });
  }
}
