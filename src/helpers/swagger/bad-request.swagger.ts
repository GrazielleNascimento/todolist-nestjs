import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwagger {
  @ApiProperty({
    example: 400, // Define o exemplo para o statusCode
    description: 'O código de status HTTP',
  })
  statusCode: number;

  @ApiProperty({
    example: [
      'O título não pode estar vazio',
      'O título deve ser uma string',
      'O título não pode ter mais de 100 caracteres',
      'A descrição não pode estar vazia',
      'A descrição deve ser uma string',
      'A descrição não pode ter mais de 500 caracteres',
      'O status deve ser um valor booleano',
    ],
    description: 'Uma lista de mensagens de erro',
  })
  message: string[];

  @ApiProperty({
    example: 'Bad Request',
    description: 'A mensagem de erro principal',
  })
  error: string;
}
