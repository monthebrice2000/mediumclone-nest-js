import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import * as dotenv from 'dotenv';
import { TagEntity } from '@models/tag.entity';
import { UserEntity } from '@models/user.entity';
import { ArticleEntity } from '@models/article.entity';



dotenv.config();

const  configs : ConnectionOptions = {
  /**
   * Database type.
   */
  type: "postgres",
  /**
   * Database host.
   */
  host : process.env.host_name,
  /**
   * Database host port.
   */
  port : parseInt( process.env.port ),
  /**
   * Database username.
   */
  username : process.env.user,
  /**
   * Database password.
   */
  password : process.env.password,
  /**
   * Database name to connect to.
   */
  database : process.env.database,
  /**
   * Entities to be loaded for this connection.
   * Accepts both entity classes and directories where from entities need to be loaded.
   * Directories support glob patterns.
   */
  entities : [ TagEntity, UserEntity , ArticleEntity, __dirname + '/**/*.entity{.ts,.js} '],
  /**
   * Indicates if database schema should be auto created on every application launch.
   * Be careful with this option and don't use this in production - otherwise you can lose production data.
   * This option is useful during debug and development.
   * Alternative to it, you can use CLI and run schema:sync command.
   *
   * Note that for MongoDB database it does not create schema, because MongoDB is schemaless.
   * Instead, it syncs just by creating indices.
   */
  synchronize : true,
  /**
   * Migrations to be loaded for this connection.
   * Accepts both migration classes and directories where from migrations need to be loaded.
   * Directories support glob patterns.
   */
  migrations: [  __dirname + '/migrations/**/*{.ts,.js}'],
  /**
   * Indicates if migrations should be auto run on every application launch.
   * Alternative to it, you can use CLI and run migrations:run command.
   */
  migrationsRun: true,
  /**
   * CLI settings.
   */
   cli : {
    /**
     * Directory where entities should be created by default.
     */
    entitiesDir : '/src/tags/model/',
    /**
     * Directory where migrations should be created by default.
     */
    migrationsDir : './migrations',
  }


}

export = configs;