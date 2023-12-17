import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefaModule } from './tarefa/tarefa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';


@Module({
  imports: [TarefaModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
