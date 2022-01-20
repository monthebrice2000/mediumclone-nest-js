import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { ArticleEntity } from '@models/article.entity';
import { Article } from '@models/article.interface';
import { UserRepository } from '@repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(ArticleEntity)
export class ArticlesRepositories extends Repository<ArticleEntity>{


  async createArticle(article: Article): Promise<ArticleEntity>{
    const { title, description, body, tagList, author } = article;
    const tagLists = !tagList ? [] : tagList;
    const slugs = title.split(' ').join('-');
    return await this.save( { slug: slugs, title, description, body, tagList: tagLists, author } );
  }

  async findArticleBySlug(slug: string): Promise<Article> {
    return await this.findOne( { slug } );
  }

  async deleteArticle(slug: string): Promise<DeleteResult> {
    return await this.delete( { slug } )
  }

  async findAll(query: Article ): Promise<{articles:Article[], articlesCount: number}> {
    const queryBuilder = this.createQueryBuilder('articles').leftJoinAndSelect('articles.author', 'author');
    const articles = await queryBuilder.getMany();
    const articlesCount = await queryBuilder.getCount();
    queryBuilder.orderBy('articles.createdAt', 'DESC')
    if( query.limit ){
      queryBuilder.limit(query.limit);
    }
    if( query.offset ){
      queryBuilder.offset(query.offset);
    }
    if( query.tag ){
      queryBuilder.andWhere( 'articles.tagList LIKE :tag', {tag:`%${query.tag}%`})
    }
    if( query.author ){
      queryBuilder.andWhere( 'articles.authorId :Id', {Id: `%${query.author.id}%`})
    }
    return { articles, articlesCount };
  }


}
