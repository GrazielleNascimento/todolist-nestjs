import { ApiProperty } from "@nestjs/swagger";

export class NotFoundSwagger{
    @ApiProperty({
        example: 404,
        description: 'O código de status HTTP',
    })
    statusCode: number;

    @ApiProperty({
        example:
        'Tarefa não encontrada',
        description: 'Uma mensagem de erro de uma tarefa não encontrada',
    })
    message: string;
    
    @ApiProperty({
        example: 'Not Found',
        description: 'A mensagem de tarefa não encontrada'
    })
    error: string;
}