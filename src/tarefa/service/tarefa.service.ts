import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from '../dto/create-tarefa.dto';
import { UpdateTarefaDto } from '../dto/update-tarefa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from '../entities/tarefa.entity';

@Injectable()
export class TarefaService {
 
  constructor(
    @InjectRepository(Tarefa)
    private tarefaRepository : Repository<Tarefa>
  ){}

   async create(createTarefaDto: CreateTarefaDto): Promise<CreateTarefaDto> {
    return this.tarefaRepository.save(createTarefaDto) ;
  }

  async findAll(): Promise<CreateTarefaDto[] | string> {
    let tarefasEncontradas = await this.tarefaRepository.find();

    if(tarefasEncontradas.length === 0) {
       return 'Nenhuma Tarefa foi encontrada!';
    }
    return tarefasEncontradas;
  }


  async  findOne(id: number) : Promise<CreateTarefaDto> {
    
    let tarefaEncontrada = await this.tarefaRepository.findOne({
      where:{
        id
      }
    })
    if(!tarefaEncontrada) {
      throw new NotFoundException(`Tarefa ${id} não encontrada!`);
    }

    return tarefaEncontrada;
  }

  async update(id: number, updateTarefaDto: UpdateTarefaDto) : Promise<CreateTarefaDto>{
     let tarefaEncontrada = await this.tarefaRepository.findOne({
      where:{
        id
      }
    })

    if(!tarefaEncontrada) {
      throw new NotFoundException(`Tarefa ${id} não encontrada!`);
    }
    this.tarefaRepository.merge(tarefaEncontrada, updateTarefaDto);
    return this.tarefaRepository.save(tarefaEncontrada);
  }

  async remove(id: number) {
    let tarefaEncontrada = await this.tarefaRepository.findOne({
      where:{
        id
      }
    })
    if(!tarefaEncontrada) {
      throw new NotFoundException(`Tarefa ${id} não encontrada!`);
    }
    
    return await this.tarefaRepository.delete(id);
  }

  
}
