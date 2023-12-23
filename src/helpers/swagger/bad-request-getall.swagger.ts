import { ApiProperty } from '@nestjs/swagger';

export class BadRequestGetAllSwagger {

  @ApiProperty({
    example: 400, 
    description: 'O código de status HTTP',
  })
  statusCode: number;

  @ApiProperty({
    example: 
      'Erro ao buscar tarefas',
    
    description: 'Uma lista de mensagens de erro',
  })
  message: string[];

  @ApiProperty({
    example: 'Bad Request',
    description: 'A mensagem de erro principal',
  })
  error: string;
}
