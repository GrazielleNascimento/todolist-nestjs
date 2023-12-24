import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  BadGatewayException,
} from '@nestjs/common';
import { TarefaService } from '../service/tarefa.service';
import { CreateTarefaDto } from '../dto/create-tarefa.dto';
import { UpdateTarefaDto } from '../dto/update-tarefa.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTarefaSwagger } from '../swagger/index-tarefa.swagger';
import { CreateTarefaSwagger } from '../swagger/create-tarefa.swagger';
import { ShowTarefaSwagger } from '../swagger/show-tarefa.swagger';
import { UpdateTarefaSwagger } from '../swagger/update-tarefa.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';
import { BadRequestGetAllSwagger } from '../../helpers/swagger/bad-request-getall.swagger';

@Controller('/tarefa')
@ApiTags('tarefas')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova Tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Nova tarefa criada com sucesso',
    type: CreateTarefaSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros da Tarefa inválidos',
    type: BadRequestSwagger,
  })
  create(@Body() createTarefaDto: CreateTarefaDto) {
    try {
      return this.tarefaService.create(createTarefaDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas Tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista com todas as Tarefas',
    type: IndexTarefaSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 400, description:'Erro ao buscar tarefas' , type: BadRequestGetAllSwagger, })
  findAll() {
    try {
      return this.tarefaService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir dados de uma Tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Dados de uma tarefa retornado com sucesso',
    type: ShowTarefaSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: NotFoundSwagger,
  })
  findOne(@Param('id') id: number) {
    try {
      return this.tarefaService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Tarefa' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    type: UpdateTarefaSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros da Tarefa inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: NotFoundSwagger,
  })
  @ApiBody({
    type: UpdateTarefaDto,
    examples: {
      default: {
        value: {
          titulo: 'string',
          descricao: 'string',
          status: true,
        },
      },
    },
  })
  update(@Param('id') id: number, @Body() updateTarefaDto: UpdateTarefaDto) {
    try {
      return this.tarefaService.update(+id, updateTarefaDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir Tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa excluída com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: NotFoundSwagger,
  })
  remove(@Param('id') id: number) {
    try {
      return this.tarefaService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
