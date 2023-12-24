import { Test, TestingModule } from '@nestjs/testing';
import { TarefaService } from './tarefa.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tarefa } from '../entities/tarefa-entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const tarefaMock = new Tarefa({ id: 1, titulo: 'Livro', descricao: 'Ler o livro da faculdade', status: true });

const tarefaListMock: Tarefa[] = [
  new Tarefa({ id: 1, titulo: 'Ler livro', descricao: 'ler o livro da faculdade', status: false })
]

const tarefaUpdatedMock = new Tarefa({ id: 1, titulo: 'Ler livro', descricao: 'Terminar de ler o livro da faculdade', status: true });

const tarefaDeletedMock = {
  "raw": [],
  "affected": 1
}

describe('TarefaService', () => {

  let service: TarefaService;
  let repository: Repository<Tarefa>;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarefaService,
        {
          provide: getRepositoryToken(Tarefa),
          useValue: {
            save: jest.fn().mockResolvedValue(tarefaMock),
            find: jest.fn().mockResolvedValue(tarefaListMock),
            findOne: jest.fn().mockResolvedValue(tarefaUpdatedMock),
            merge: jest.fn().mockResolvedValue(tarefaUpdatedMock),
            delete: jest.fn().mockResolvedValue(tarefaDeletedMock),
          },
        },
      ],
    }).compile();

    service = module.get<TarefaService>(TarefaService);
    repository = module.get<Repository<any>>(getRepositoryToken(Tarefa));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('Deve salvar uma nova tarefa', async () => {
      // preparacao
      const tarefaDto = {
        'titulo': 'Ler livro',
        'descricao': 'Ler livro da faculdade'
      }

      // acao
      const result = await service.create(tarefaDto);

      // validacao
      expect(result).toEqual(tarefaMock);
    });

    it('Deve retornar uma excessao', () => {
      // preparacao
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new BadRequestException())
      const tarefaDto = {
        'titulo': 'Ler livro',
        'descricao': 'Ler livro da faculdade'
      }

      // acao
      const result = service.create(tarefaDto);

      // validacao
      expect(result).rejects.toThrow(BadRequestException);
    })
  });

  describe('findAll', () => {
    it('Deve retornar uma lista de tarefas', async () => {
      // acao 
      const result = await service.findAll();

      // validacao
      expect(result).toEqual(tarefaListMock);
    });

    it('Deve lancar uma excecao', () => {
      // preparacao
      jest.spyOn(repository, 'find').mockRejectedValueOnce(new BadRequestException())

      //acao
      const result = service.findAll();

      // validacao
      expect(result).rejects.toThrow(BadRequestException);
    });

  });

  describe('update', () => {
    it('Deve atualizar a tarefa de id 1 com sucesso', async () => {
      // preparacao 
      jest.spyOn(repository, 'save').mockResolvedValueOnce(tarefaUpdatedMock);
      const id = 1;
      const tarefaUpdateDto = {
        'status': true
      }

      // acao
      const result = await service.update(id, tarefaUpdateDto);

      // validacao
      expect(result).toEqual(tarefaUpdatedMock);

    });

    it('Deve retornar uma excecao do tipo not found', () => {
      // preparacao
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new NotFoundException());
      const id = 3;
      const tarefaUpdateDto = {
        'status': true
      }

      // acao
      const result = service.update(id, tarefaUpdateDto);

      // validacao
      expect(result).rejects.toThrow(NotFoundException);
    });

    it('Deve retornar uma excecao do tipo bad request', () => {
      // preparacao
      jest.spyOn(repository, 'save').mockRejectedValueOnce(new BadRequestException());
      const id = 1;
      const tarefaUpdateDto = {
        'status': true
      }

      // acao
      const result = service.update(id, tarefaUpdateDto);

      // validacao
      expect(result).rejects.toThrow(BadRequestException);
    });
  });


  describe('findOne', () => {
    it('Deve retornar a tarefa de id 1', async () => {
      // preparacao
      const id = 1;

      // acao
      const result = await service.findOne(id);

      // validacao
      expect(result).toEqual(tarefaUpdatedMock);
    })

    it('Deve retornar uma excecao do tipo bad request', () => {
      // preparacao
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new NotFoundException());
      const id = 1;
      //acao
      const result = service.findOne(id);

      //validacao
      expect(result).rejects.toThrow(NotFoundException);

    });
  })

  describe('remove', () => {
    it('Deve remover a tarefa de id 1 com sucesso', async () => {
      // preparacao
      const id = 1;

      // acao
      const result = await service.remove(id);

      // validacao
      expect(result).toEqual(tarefaDeletedMock);
    });

    it('DEve retornar uma excecao do tipo bad request', () => {
      // preparacao
      jest.spyOn(repository, 'delete').mockRejectedValueOnce(new BadRequestException());
      const id = 1;

      // acao
      const result = service.remove(id);

      // validacao
      expect(result).rejects.toThrow(BadRequestException);
    });
  });

});
