import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import * as b from 'bcrypt';
import { ArticleEntity } from '@models/article.entity';
@Entity('Users')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: ''})
  bio: string;

  @Column({default:''})
  image: string;

  @Column()
  password: string;

  @Column({unique: true})
  username: string;

  @BeforeInsert()
  async hashPassword(){
    this.password = await b.hashSync( this.password, await b.genSalt() );
  }

  @OneToMany( () => ArticleEntity , (article: ArticleEntity) => article.author )
  articles: ArticleEntity

  @ManyToMany( () => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];




}
