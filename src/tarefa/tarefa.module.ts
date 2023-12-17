import { Module } from '@nestjs/common';
import { TarefaService } from './service/tarefa.service';
import { TarefaController } from './controller/tarefa.controller';

@Module({
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
