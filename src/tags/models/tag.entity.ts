import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tags')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({unique: true, nullable: false})
  name: string;
}
