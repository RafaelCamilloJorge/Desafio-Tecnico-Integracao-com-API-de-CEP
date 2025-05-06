import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import { json } from 'body-parser';
import  sequelize  from './src/config/database';
import cepRoutes from './src/routes/CepRoutes';
import { CepRepository } from './src/repository/CepRepository';
import { CepService } from './src/services/CepService';
import { CepController } from './src/controllers/CepController';

container.registerSingleton<CepRepository>('CepRepository', CepRepository);
container.registerSingleton<CepService>('CepService', CepService);
container.registerSingleton<CepController>('CepController', CepController);

const app = express();
app.use(json());

app.use('/api', cepRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados com sucesso.');

    // Sincroniza as tabelas
    await sequelize.sync({ force: false });
    console.log('🛠️ Tabelas sincronizadas com o banco.');

    // Inicializa o servidor
    app.listen(3000, () => {
      console.log('🚀 Servidor rodando na porta 3000');
    });
  } catch (error) {
    console.error('❌ Erro ao conectar no banco de dados:', error);
    process.exit(1);
  }
};

start();
