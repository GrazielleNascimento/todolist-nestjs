// configuracao do banco SQLITE
import { DataSourceOptions } from 'typeorm';
import { Tarefa } from './tarefa/entities/tarefa-entity';

export const config: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [Tarefa],
    synchronize: true,
  };