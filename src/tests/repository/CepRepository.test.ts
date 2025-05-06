import { CepRepository } from '../../repository/CepRepository';
import { Cep } from '../../models/CepModel';

jest.mock('../../models/CepModel', () => {
  return {
    Cep: {
      create: jest.fn(),
      findByPk: jest.fn(),
    },
  };
});

describe('CepRepository', () => {
  let cepRepository: CepRepository;

  beforeEach(() => {
    cepRepository = new CepRepository();
  });

  it('deve criar um novo CEP', async () => {
    const mockCepData = {
      cep: '90200-280',
      logradouro: 'Rua Domingos Martins',
      bairro: 'Floresta',
      localidade: 'Porto Alegre',
      uf: 'RS',
      favorito: false,
    };

    (Cep.create as jest.Mock).mockResolvedValue(mockCepData);

    const result = await cepRepository.create(mockCepData);

    expect(result).toEqual(mockCepData);
    expect(Cep.create).toHaveBeenCalledWith(mockCepData);
  });

  it('deve encontrar um CEP por código', async () => {
    const mockCepData = {
      cep: '90200-280',
      logradouro: 'Rua Domingos Martins',
      bairro: 'Floresta',
      localidade: 'Porto Alegre',
      uf: 'RS',
      favorito: false,
    };

    (Cep.findByPk as jest.Mock).mockResolvedValue(mockCepData);

    const result = await cepRepository.findByCep('90200-280');
    expect(result).toEqual(mockCepData);
    expect(Cep.findByPk).toHaveBeenCalledWith('90200-280');
  });
});
