import { Cep } from '../models/CepModel';
import { ICepRepository } from './ICepRepository';

export class CepRepository implements ICepRepository {
  async create(cepData: any) {
    return await Cep.create(cepData);
  }

  async findByCep(cep: string) {
    return await Cep.findByPk(cep);
  }

  async update(cep: string, data: any) {
    return await Cep.update(data, { where: { cep } });
  }

  async setFavorite(cep: string, favorito: boolean) {
    return await Cep.update({ favorito }, { where: { cep } });
  }

  async findAll() {
    return await Cep.findAll();
  }
}
