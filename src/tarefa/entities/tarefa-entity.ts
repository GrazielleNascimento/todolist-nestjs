import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tarefa' })
export class Tarefa {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column({ length: 100, nullable: false })
  @ApiProperty()
  titulo: string;

  @Column({ length: 500, nullable: false })
  @ApiProperty()
  descricao: string;

  @Column({ default: false }) //inicia como false pois a tarefa não foi concluida
  @ApiProperty()
  status: boolean;

  constructor (tarefa?: Partial<Tarefa>) {
    this.id = tarefa?.id;
    this.titulo = tarefa?.titulo;
    this.descricao = tarefa?.descricao;
    this.status = tarefa?.status;
  }
}
