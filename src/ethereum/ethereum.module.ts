import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EtherScanService } from './etherscan.service';
import { EthereumController } from './ethereum.controller';

@Module({
  imports: [HttpModule],
  providers: [EtherScanService],
  exports: [EtherScanService],
  controllers: [EthereumController],
})
export class EthereumModule {}
