import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@models/user.entity';
import { User } from '@models/user.interface';

@Entity('Articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({default: ''})
  slug: string;
  @Column({default: ''})
  title: string;
  @Column({default: ''})
  description: string;
  @Column({default: ''})
  body: string;
  @Column({ type:'simple-array'})
  tagList: string[];
  @Column({type:'timestamp', default : () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
  @Column({type:'timestamp', default : () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
  /*@Column({type: 'boolean'})
  favorited: boolean;*/
  @Column({type: 'int', default: 0})
  favoritesCount: number;
  @BeforeUpdate()
  updateTimestamp(): void{
    this.updatedAt = new Date();
  }

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.articles)
  author: UserEntity;
}
