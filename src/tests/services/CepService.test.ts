import 'reflect-metadata';
import { CepService } from '../../services/CepService';
import { CepRepository } from '../../repository/CepRepository';
import { Cep } from '../../models/CepModel';

jest.mock('../../repository/CepRepository');

describe('CepService', () => {
  let cepService: CepService;
  let cepRepositoryMock: jest.Mocked<CepRepository>;

  beforeEach(() => {
    cepRepositoryMock = new CepRepository() as jest.Mocked<CepRepository>;
    cepService = new CepService(cepRepositoryMock);
  });

  it('should create a new cep', async () => {
    const cepData = {
      cep: '90200-280',
      logradouro: 'Rua Domingos Martins',
      bairro: 'Floresta',
      localidade: 'Porto Alegre',
      uf: 'RS',
      favorito: false
    };

    const cepInstance = Cep.build(cepData);

    cepRepositoryMock.create.mockResolvedValue(cepInstance);

    const result = await cepService.create(cepData);
    expect(result).toEqual(cepInstance);
    expect(cepRepositoryMock.create).toHaveBeenCalledWith(cepData);
  });
});
