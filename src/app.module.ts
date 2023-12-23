import { Module } from '@nestjs/common';
import { TarefaModule } from './tarefa/tarefa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';


@Module({
  imports: [TarefaModule, TypeOrmModule.forRoot(config)]
})
export class AppModule {}
