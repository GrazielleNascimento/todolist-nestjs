import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Tarefa } from '../src/tarefa/entities/tarefa-entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdTarefaId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // cria uma nova tarefa antes de todos os testes
    const createRes = await request(app.getHttpServer())
      .post('/tarefa')
      .send({
        titulo: 'Livro',
        descricao: 'Ler o livro da faculdade'
      })
      .expect(201);
    createdTarefaId = createRes.body.id;
  });

  describe('create', () => {

    it('/tarefa (POST)', async () => {
      // preparacao
      const tarefaJson = {
        'titulo': 'Entrevista',
        'descricao': 'Reuniao com entrevistador'
      }

      // acao e validacao
      request(app.getHttpServer())
        .post('/tarefa')
        .send(tarefaJson)
        .expect(201)
        .expect(new Tarefa({ id: 1, titulo: 'Livro', descricao: 'Ler o livro da faculdade', status: false }));
    });
  });

  describe('findAll', () => {
    it('/tarefa (GET)', async () => {
      // acao
      const res = await request(app.getHttpServer())
        .get('/tarefa')
        .expect(200);

      // validacao
      expect(res.body).toEqual(
        [
          {
            id: expect.any(Number),
            titulo: 'Livro',
            descricao: 'Ler o livro da faculdade',
            status: false
          }
        ]
      )
    });
  });

  describe('update', () => {
    it('/tarefa/{id} (POST)', async () => {
      // preparacao
      const tarefaJson = {
        status: true
      }

      // acao
      const res = await request(app.getHttpServer())
        .put(`/tarefa/${createdTarefaId}`)
        .send(tarefaJson)
        .expect(200);

      // validacao {
      expect(res.body).toEqual(
        {
          id: createdTarefaId,
          titulo: 'Livro',
          descricao: 'Ler o livro da faculdade',
          status: true
        }
      );
    });
  });

  describe('findOne', () => {
    it('/tarefa/{id} (GET)', async () => {

      // acao
      const res = await request(app.getHttpServer())
        .get(`/tarefa/${createdTarefaId}`)
        .expect(200);

      // validacao
      expect(res.body).toEqual(
        {
          id: createdTarefaId,
          titulo: 'Livro',
          descricao: 'Ler o livro da faculdade',
          status: false
        }
      )

    });
  })

  describe('remove', () => {
    it('/tarefa/{id} (REMOVE)', async () => {
      // acao
      const res = await request(app.getHttpServer())
        .delete(`/tarefa/${createdTarefaId}`)
        .expect(200);

      // validacao
      expect(res.body).toEqual(
        {
          "raw": [],
          "affected": 1
        }
      )
    })
  })

});



