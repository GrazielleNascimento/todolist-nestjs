import { ApiProperty } from '@nestjs/swagger';

export  class CreateTarefaSwagger{

@ApiProperty({
  example:  1,
  description:'identificador da tarefa'
})
id: number;


@ApiProperty({
    example:'Reunião'
})
titulo: string;

@ApiProperty({
    example:'Reunião com acionistas a respeito das novas demandas'
})
descricao: string;

@ApiProperty({default:false})
status: boolean;

}