import { Test, TestingModule } from '@nestjs/testing';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from '../service/tarefa.service';

const tarefaEntityList: [] = [
  //new tarefa ({id '1', titulo: 'livro', descricao 'ler o livro da faculdade'}),
]

describe('TarefaController', () => {
  let controller: TarefaController;
  let service : TarefaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarefaController],
      providers: [
        {
          provide: TarefaService,
          useValue:{
            create: jest.fn().mockResolvedValue(tarefaEntityList),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),

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

    describe('findAll', () => {
      it('should return a tarefa entity sucessfully', async () => {
        //Act
        const result = await controller.findAll(); 

        //Assert 
        expect(result).toEqual(tarefaEntityList);

      });
    });

});
