import { Router } from 'express';
import { CepController } from '../controllers/CepController';
import { container } from 'tsyringe';

const router = Router();
const cepController = container.resolve(CepController);

router.post('/cep', (req, res) => cepController.create(req, res));
router.get('/cep/:cep', (req, res) => cepController.get(req, res));
router.put('/cep/:cep', (req, res) => cepController.update(req, res));
router.post('/cep/:cep/favorite', (req, res) => cepController.addFavorite(req, res));
router.delete('/cep/:cep/favorite', (req, res) => cepController.removeFavorite(req, res));
router.get('/ceps', (req, res) => cepController.getAll(req, res));

  

export default router;
