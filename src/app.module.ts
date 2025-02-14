import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { OpenAiModule } from './modules/shared/openai/openai.module';
import { ESModuleGlobal } from './modules/elastic-search/elastic-search.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/products.controller';
import { PrismaService } from './modules/shared/prisma/prisma.service';
import { PrismaModule } from './modules/shared/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    OpenAiModule,
    ESModuleGlobal,

    ProductsModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [],
})
export class AppModule {}
