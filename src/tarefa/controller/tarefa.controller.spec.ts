import { Test, TestingModule } from '@nestjs/testing';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from '../service/tarefa.service';
import { Tarefa } from '../entities/tarefa-entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const tarefaMock = new Tarefa({ id: 1, titulo: 'Livro', descricao: 'Ler o livro da faculdade' });

const tarefaListMock: Tarefa[] = [
  new Tarefa({ id: 1, titulo: 'Ler livro', descricao: 'ler o livro da faculdade', status: false })
]

const tarefaUpdatedMock = new Tarefa({ id: 1, titulo: 'Ler livro', descricao: 'Terminar de ler o livro da faculdade', status: true });

const tarefaDeletedMock = {
  "raw": [],
  "affected": 1
}

describe('TarefaController', () => {
  let controller: TarefaController;
  let service: TarefaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarefaController],
      providers: [
        {
          provide: TarefaService,
          useValue: {
            create: jest.fn().mockResolvedValue(tarefaMock),
            findAll: jest.fn().mockResolvedValue(tarefaListMock),
            update: jest.fn().mockResolvedValue(tarefaUpdatedMock),
            findOne: jest.fn().mockResolvedValue(tarefaUpdatedMock),
            remove: jest.fn().mockResolvedValue(tarefaDeletedMock),
          },
        },
      ],
    }).compile();

    controller = module.get<TarefaController>(TarefaController);
    service = module.get<TarefaService>(TarefaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve criar uma nova tarefa com sucesso', async () => {

      // preparacao
      const tarefa = {
        'titulo': 'Livro',
        'descricao': 'ler o livro da faculdade'
      }

      // acao
      const result = await controller.create(tarefa);

      // validacao
      expect(result).toEqual(tarefaMock);
      expect(typeof result).toEqual('object');
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(tarefa);
    });

    it('Deve retornar uma excecao do tipo bad request', () => {
      // preparacao
      jest.spyOn(service, 'create').mockRejectedValueOnce(new BadRequestException());
      const tarefa = {
        'titulo': 'Livro',
        'descricao': 'ler o livro da faculdade'
      }

      // acao
      const result = service.create(tarefa);

      // validacao
      expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('Deve retornar a lista de tarefas com sucesso', async () => {
      // acao
      const result = await controller.findAll();

      // validacao 
      expect(result).toEqual(tarefaListMock);
      expect(typeof result).toEqual('object');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma excecao deo tipo bad request', () => {
      // preparacao
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new BadRequestException());

      // acao
      const result = service.findAll();

      // validacao
      expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('Deve atualizar a tarefa de id 1 com sucesso', async () => {

      // preparacao
      const tarefa = {
        'titulo': 'Ler livro',
        'descricao': 'Terminar de ler o livro da faculdade',
        'status': true
      }

      // acao
      const result = await controller.update(1, tarefa);

      // validacao
      expect(result).toEqual(tarefaUpdatedMock);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(1, tarefa);
    });

    it('Deve retornar uma excecao do tipo bad request', () => {
      // preparacao
      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException());
      const id = 1;
      const tarefa = {
        'status': true
      }

      // acao
      const result = service.update(id, tarefa);

      // validacao
      expect(result).rejects.toThrow(NotFoundException);
    });

    it('Deve retornar uma excecao do tipo bad request', () => {
      // preparacao
      jest.spyOn(service, 'update').mockRejectedValueOnce(new BadRequestException());
      const id = 1;
      const tarefa = {
        'status': true
      }

      // acao
      const result = service.update(id, tarefa);

      // validacao
      expect(result).rejects.toThrow(BadRequestException);
    });

  });

  describe('findOne', () => {
    it('Deve retornar a tarefa de id 1 com sucesso', async () => {

      // acao
      const result = await controller.findOne(1);

      // validacao
      expect(result).toEqual(tarefaUpdatedMock);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    })

    it('Deve retornar uma excecao do tipo not found', () => {
      // preparacao
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException);
      const id = 1;

      // acao
      const result = service.findOne(id);

      // validacao
      expect(result).rejects.toThrow(NotFoundException);
    });
  })

  describe('remove', () => {
    it('Deve remover a tarefa de id 1 com sucesso', async () => {
      // preparacao
      const id = 1;

      // acao
      const result = await controller.remove(id);

      // validacao
      expect(result).toEqual(tarefaDeletedMock);
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('Deve retornar uma excecao do tipo not found', () => {
      // preparacao
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new NotFoundException);
      const id = 1;

      // acao
      const result = service.remove(id);

      // validacao
      expect(result).rejects.toThrow(NotFoundException);
    });
  });

});






