import { ApiProperty } from "@nestjs/swagger";


export class UpdateTarefaSwagger {

    @ApiProperty({
        example:  1,
        description:'identificador da tarefa'
      })
      id: number;
      
      
      @ApiProperty({
          example:'Reunião realizada'
      })
      titulo: string;
      
      @ApiProperty({
          example:'Alinhamento de métricas com acionistas'
      })
      descricao: string;
      
      @ApiProperty({
        example: 'true'
      })
      status: boolean;
      
      }
