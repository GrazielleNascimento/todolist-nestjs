import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateTarefaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O título não pode estar vazio' })
  @IsString({ message: 'O título deve ser uma string' })
  @MaxLength(100, { message: 'O título não pode ter mais de 100 caracteres' })
  titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'A descrição não pode estar vazia' })
  @IsString({ message: 'A descrição deve ser uma string' })
  @MaxLength(500, { message: 'A descrição não pode ter mais de 500 caracteres' })
  descricao: string;


  @ApiPropertyOptional()
  @IsBoolean({ message: 'O status deve ser um valor booleano' })
  @IsOptional()
  status?: boolean; // se for false = tarefa pendente,se for true = tarefa concluida
}
