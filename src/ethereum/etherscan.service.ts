import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import BigNumber from 'bignumber.js';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { arrPartition } from '../common/util';
import { GetBalancesReponseDTO } from './ethereum.dto';
import { EtherUnit, IBalance } from './ethereum.interface';
import { EthereumService } from './ethereum.service';

/**
 * Api Documentation {@link https://docs.etherscan.io/}
 */
@Injectable()
export class EtherScanService extends EthereumService {
  private baseUrl = 'https://api.etherscan.io/api';
  private apiKey = process.env.ETHERSCAN_APIKEY;

  constructor(httpService: HttpService) {
    super(httpService);
  }

  async getBalances(addresses: string[]): Promise<GetBalancesReponseDTO[]> {
    if (!addresses || !addresses.length) return [];

    const [validAddresses, nonValidAddresses] = arrPartition(
      addresses,
      this.validateAddress,
    );

    const [balances, ethereumUsdValue] = await Promise.all([
      this.fetchBalances(validAddresses),
      this.getEthereumUsdValue(),
    ]);

    const balancesWithUsd = balances.map((b) => ({
      ...b,
      usdBalance: new BigNumber(b.balance)
        .multipliedBy(new BigNumber(ethereumUsdValue))
        .toNumber(),
    }));

    const result = plainToInstance(GetBalancesReponseDTO, [
      ...balancesWithUsd,
      ...nonValidAddresses.map((n) => ({ address: n, valid: false })),
    ]);

    return result;
  }

  private async fetchBalances(addresses: string[]): Promise<IBalance[]> {
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

  // @Deprecated
  // !Using Memoize Decarators on getEthereumUsdValue
  /* async getEthereumUsdValueWithMemoization(): Promise<number> {
    const now = Date.now();
    const lastDate: number = this.ethereumUsd.lastDate;

    if (!lastDate || now - lastDate > this.ethereumUsd.dueTime) {
      const usdValue = await this.getEthereumUsdValue();
      this.ethereumUsd.value = usdValue;
      this.ethereumUsd.lastDate = now;
    }

    return this.ethereumUsd.value;
  } */
}
