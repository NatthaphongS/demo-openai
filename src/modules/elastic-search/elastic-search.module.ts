import { Global, Module } from '@nestjs/common';
import { ESProductService } from './services/es-product.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Global()
@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: 'http://localhost:9200',
        // auth: {
        //   apiKey: configService.get<string>('ELASTICSEARCH_API_KEY'),
        // },
      }),
    }),
  ],
  providers: [ESProductService],
  exports: [ESProductService],
})
export class ESModuleGlobal {}
