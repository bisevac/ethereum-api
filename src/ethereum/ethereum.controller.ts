import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/base/ApiResponse';
import { GetBalancesReponseDTO, GetBalancesRequestDTO } from './ethereum.dto';
import { EtherScanService } from './etherscan.service';

@ApiTags('Ethereum')
@Controller('ethereum')
export class EthereumController {
  constructor(private readonly ethereumService: EtherScanService) {}

  @Post('/balance')
  async getBalances(
    @Body() body: GetBalancesRequestDTO,
  ): Promise<ApiResponse<GetBalancesReponseDTO[]>> {
    const { addresses } = body;

    const result = await this.ethereumService.getBalances(addresses);

    return new ApiResponse(result);
  }
}
