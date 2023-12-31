import { AuthModule } from '@microservice-app/auth';
import { SharedModule } from '@microservice-app/shared';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtendedGqlExecutionContext } from './extended-gql-context';
import { LoginResolver } from './resolvers/login.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { ArticleService } from './services/article.service';
import { ArticleResolver } from './resolvers/article.resolver';
import { CommentResolver } from './resolvers/comment.resolver';
import { ProfileResolver } from './resolvers/profile.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema.graphql',
      sortSchema: true,
      context: ({
        req,
        res,
        payload,
        connection,
      }): ExtendedGqlExecutionContext => ({
        req,
        res,
        payload,
        connection,
        token: req.headers.token,
      }),
    }),
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    ProfileService,
    ArticleService,
    LoginResolver,
    UserResolver,
    ArticleResolver,
    CommentResolver,
    ProfileResolver,
  ],
})
export class AppModule {}
