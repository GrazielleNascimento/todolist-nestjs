import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'tarefa' })
export class Tarefa {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100, nullable: false })
  titulo: string;

  @Column({ length: 500, nullable: false })
  descricao: string;

  @Column({default: false}) //inicia como false pois a tarefa não foi concluida
  status: boolean;
}
  

