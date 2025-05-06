import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../config/database';

export class Cep extends Model {
  cep!: string;
  logradouro!: string;
  bairro!: string;
  localidade!: string;
  uf!: string;
  favorito!: boolean;
}

Cep.init(
  {
    cep: { type: DataTypes.STRING, primaryKey: true },
    logradouro: DataTypes.STRING,
    bairro: DataTypes.STRING,
    localidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    favorito: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'Cep',
    tableName: 'ceps',
    timestamps: false,
  }
);
