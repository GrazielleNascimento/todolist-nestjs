import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTarefaDto } from '../dto/create-tarefa.dto';
import { UpdateTarefaDto } from '../dto/update-tarefa.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarefa } from '../entities/tarefa-entity';
import { validate } from 'class-validator';

@Injectable()
export class TarefaService {
 
  constructor(
    @InjectRepository(Tarefa)
    private tarefaRepository : Repository<Tarefa>
  ){}

   async create(createTarefaDto: CreateTarefaDto): Promise<CreateTarefaDto> {
    const errors = await validate(createTarefaDto);

    if (errors.length > 0) {
      throw new BadRequestException('Erro de validação: ' + this.formataErrosDeValidacao(errors));
    }

    try{

      return await this.tarefaRepository.save(createTarefaDto) ;
      
    }catch(error){
      throw new NotFoundException('Não foi possivel criar uma nova tarefa')
    }
  }

  async findAll(): Promise<CreateTarefaDto[]> {

    try{
      let tarefasEncontradas = await this.tarefaRepository.find();

      return tarefasEncontradas;

    }catch(error){
      throw new NotFoundException('Não foi possivel obter a lista de tarefas')
    }
  }

  async  findOne(id: number) : Promise<CreateTarefaDto> {
    
    try{
      let tarefaEncontrada = await this.tarefaRepository.findOne({
        where:{
          id
        }
      })
      if(!tarefaEncontrada) {
        throw new NotFoundException(`Tarefa ${id} não encontrada!`);
      }
  
      return tarefaEncontrada;

    }catch(error){
      throw new NotFoundException('Não foi possivel encontrar a tarefa')
    }
    
  }
   

  async update(id: number, updateTarefaDto: UpdateTarefaDto) : Promise<CreateTarefaDto>{
    const errors = await validate(updateTarefaDto);

    if (errors.length > 0) {
      throw new BadRequestException('Erro de validação: ' + this.formataErrosDeValidacao(errors));
    }
    
    try{

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
    }catch(error){
      throw new NotFoundException('Não foi possivel atualizar a tarefa')
    }
    
  }
   

  async remove(id: number) {
    try{
      let tarefaEncontrada = await this.tarefaRepository.findOne({
        where:{
          id
        }
      })
      if(!tarefaEncontrada) {
        throw new NotFoundException(`Tarefa ${id} não encontrada!`);
      }
      
      return await this.tarefaRepository.delete(id);
    }catch(error){
      throw new NotFoundException('Não foi possivel deletar a tarefa')
    }
    
  }

  private formataErrosDeValidacao(errors: any[]): string {
    return errors.map(error => Object.values(error.constraints).join(', ')).join('; ');
  }
}
