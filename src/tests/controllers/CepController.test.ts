import 'reflect-metadata';
import { container } from 'tsyringe';
import { CepController } from '../../controllers/CepController';
import { CepService } from '../../services/CepService';

jest.mock('../../services/CepService');

describe('CepController', () => {
    let cepController: CepController;
    let cepService: CepService;

    beforeAll(() => {
        cepService = {
            getCepByCep: jest.fn(),
            importFromViaCep: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
            getAll: jest.fn(),
        } as unknown as CepService;

        container.registerInstance(CepService, cepService);
        cepController = container.resolve(CepController);
    });

    it('should return status 200 and data when valid CEP is provided', async () => {
        const validCepData = {
            cep: '12345678',
            logradouro: 'Rua Teste',
            bairro: 'Bairro Teste',
            localidade: 'Cidade Teste',
            uf: 'SP',
            favorito: false,
        };

        (cepService.getCepByCep as jest.Mock).mockResolvedValue(validCepData);

        const req = { params: { cep: '12345678' } } as unknown as Request;


        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as unknown as Response;

        await cepController.get(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(validCepData);
    });

    it('should return status 404 when CEP is not found', async () => {
        (cepService.getCepByCep as jest.Mock).mockResolvedValue(null);

        const req = { params: { cep: '87654321' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as unknown as Response;

        await cepController.get(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'CEP não encontrado' });
    });

    it('should return status 500 when an error occurs', async () => {
        (cepService.getCepByCep as jest.Mock).mockRejectedValue(new Error('Erro inesperado'));

        const req = { params: { cep: '12345678' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as unknown as Response;

        await cepController.get(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao buscar o CEP' });
    });

});