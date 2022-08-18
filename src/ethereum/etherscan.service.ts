import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { EtherUnit, IBalance } from './ethereum.interface';
import { EthereumService } from './ethereum.service';

/**
 * Api Documentation {@link https://docs.etherscan.io/}
 */
@Injectable()
export class EtherScanService extends EthereumService {
  private baseUrl = 'https://api.etherscan.io/api';
  private apiKey = process.env.ETHERSCAN_APIKEY;

  constructor(private httpService: HttpService) {
    super();
  }

  async getBalances(addresses: string[]): Promise<IBalance[]> {
    if (!addresses || !addresses.length) return [];

    const params = new URLSearchParams({
      module: 'account',
      action: 'balancemulti',
      address: addresses.join(','),
      tag: 'latest',
      apikey: this.apiKey,
    });

    const reqUrl = `${this.baseUrl}?${params.toString()}`;

    const response: AxiosResponse<any> = await firstValueFrom(
      await this.httpService.get<any>(reqUrl, {
        validateStatus: () => true,
      }),
    );

    const { status, data } = response;

    /**
     * ERROR CASE
     */
    if (status !== 200 || data.status != 1) {
      throw new Error(
        `Error on EtherScanService, status:${status} 
        data:${JSON.stringify(data, null, 2)}`,
      );
    }

    const balances: IBalance[] = data.result.map((d) => ({
      address: d.account,
      balance: this.unitConverter(d.balance, EtherUnit.Wei, EtherUnit.Ether), // ( wei to ether )
    }));

    return balances;
  }
}
