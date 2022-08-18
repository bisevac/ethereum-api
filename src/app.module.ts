import { Module } from '@nestjs/common';
import { EthereumModule } from './ethereum/ethereum.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), EthereumModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
