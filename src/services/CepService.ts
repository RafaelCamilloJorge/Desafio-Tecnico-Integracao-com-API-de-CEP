import axios from 'axios';
import { CepRepository } from '../repository/CepRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class CepService {
  constructor(
    @inject(CepRepository)
    private cepRepository: CepRepository) { }

  async importFromViaCep(cep: string) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const cepData = response.data;

    if (cepData.erro) {
      throw new Error(`CEP ${cep} não encontrado!`);
    }

    let exists = await this.cepRepository.findByCep(cepData.cep);
    if (!exists) {
      await this.cepRepository.create({
        cep: cepData.cep,
        logradouro: cepData.logradouro,
        bairro: cepData.bairro,
        localidade: cepData.localidade,
        uf: cepData.uf,
        favorito: false
      });
    }

    exists = await this.cepRepository.findByCep(cepData.cep);

    return exists;
  }

  async create(cepData: any) {
    const exists = await this.cepRepository.findByCep(cepData.cep);
    if (exists) {
      throw new Error(`O CEP ${cepData.cep} já existe no banco de dados!`);
    }
    return await this.cepRepository.create(cepData);
  }

  async get(cep: string) {
    return await this.cepRepository.findByCep(cep);
  }

  async update(cep: string, data: any) {
    return await this.cepRepository.update(cep, data);
  }

  async addFavorite(cep: string) {
    return await this.cepRepository.setFavorite(cep, true);
  }

  async removeFavorite(cep: string) {
    return await this.cepRepository.setFavorite(cep, false);
  }

  async getAll() {
    return await this.cepRepository.findAll();
  }

  async getCepByCep(cep: string) {
    return await this.cepRepository.findByCep(cep);
  }
}
