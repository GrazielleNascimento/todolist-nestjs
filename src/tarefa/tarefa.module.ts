import { Module } from '@nestjs/common';
import { TarefaService } from './service/tarefa.service';
import { TarefaController } from './controller/tarefa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa-entity';

@Module({
  controllers: [TarefaController],
  providers: [TarefaService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Tarefa])],
})
export class TarefaModule {}
