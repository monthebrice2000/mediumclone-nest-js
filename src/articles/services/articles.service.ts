import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticlesRepositories } from '@repositories/articles.repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@models/article.interface';
import { ArticleEntity } from '@models/article.entity';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectRepository(ArticlesRepositories)
    private readonly articleRepository: ArticlesRepositories,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ){

  }

  async createArticle( article: Article): Promise<ArticleEntity> {
    return await this.articleRepository.createArticle(article)
  }

  async findArticleBySlug(slug: string): Promise<Article> {
    const articles: Article = await this.articleRepository.findArticleBySlug(slug);
    if (articles) {
      return articles;
    } else {
      throw new NotFoundException(`Article with slug ${slug} not found`);
    }
  }

  async deleteArticle(slug: string): Promise<string> {
    const articles  = await this.articleRepository.deleteArticle(slug);
    if (articles) {
      return `Article from ${slug} was deleted`;
    } else {
      throw new NotFoundException(`Article with slug ${slug} not found`);
    }
  }

  async findAll(article: Article): Promise<{articles:Article[], articlesCount: number}> {
    const articles  = await this.articleRepository.findAll(article);
    if (articles.articles) {
      return articles;
    } else {
      throw new NotFoundException(`Article with slug ${article.slug} not found`);
    }
  }

  async likeArticle(article: Article){
    const { slug, author } = article;
    const articleFound = await this.articleRepository.findOne({slug} );
    const user = await this.userRepository.findOne( author.id, { relations : ['favorites'] } );

    const isFavorited = user.favorites.find( articleFavorite => { return articleFavorite.id === articleFound.id });

    if( !isFavorited ){
      user.favorites.push( articleFound );
      articleFound.favoritesCount++;
      await this.userRepository.save( user );
      await this.articleRepository.save( articleFound );
    }

    return articleFound;
  }

  async dislikeArticle(article: Article){
    const { slug, author } = article;
    const articleFound = await this.articleRepository.findOne({slug} );
    const user = await this.userRepository.findOne( author.id, { relations : ['favorites'] } );

    const isFavorited = user.favorites.findIndex( articleFavorite => { return articleFavorite.id === articleFound.id });

    if( isFavorited !== -1 ){
      user.favorites.splice( isFavorited, 1 );
      articleFound.favoritesCount--;
      await this.userRepository.save( user );
      await this.articleRepository.save( articleFound );
    }
    return articleFound;
  }
}
