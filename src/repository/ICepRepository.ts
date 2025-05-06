import { Cep } from '../models/CepModel';

export interface ICepRepository {
  create(cepData: any): Promise<Cep>;
  findByCep(cep: string): Promise<Cep | null>;
  update(cep: string, data: any): Promise<[number]>;
  setFavorite(cep: string, favorito: boolean): Promise<[number]>;
  findAll(): Promise<Cep[]>;
}