import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from '../common/base/ApiResponse';
import { arrPartition } from '../common/util';
import { GetBalancesReponseDTO, GetBalancesRequestDTO } from './ethereum.dto';
import { EtherScanService } from './etherscan.service';

@ApiTags('Ethereum')
@Controller('ethereum')
export class EthereumController {
  constructor(private readonly etherService: EtherScanService) {}

  @Post('/balance')
  async getBalances(
    @Body() body: GetBalancesRequestDTO,
  ): Promise<ApiResponse<GetBalancesReponseDTO[]>> {
    const { addresses } = body;

    const [validAddresses, nonValidAddresses] = arrPartition(
      addresses,
      this.etherService.validateAddress,
    );

    const balances = await this.etherService.getBalances(validAddresses);

    const result = plainToInstance(GetBalancesReponseDTO, [
      ...balances,
      ...nonValidAddresses.map((n) => ({ address: n, valid: false })),
    ]);

    return new ApiResponse(result);
  }
}
