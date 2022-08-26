import { isAddress } from 'web3-utils';
import { EtherUnit, IBalance } from './ethereum.interface';
import BigNumber from 'bignumber.js';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Memoize } from '../common/decarators/memoize.decarator';

export abstract class EthereumService {
  constructor(protected httpService: HttpService) {}

  @Memoize()
  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  @Memoize()
  unitConverter(n: string, from: EtherUnit, to: EtherUnit): string {
    const pow = from - to;
    const bigNumber = new BigNumber(n).multipliedBy(new BigNumber(10).pow(pow));

    return bigNumber.toString();
  }

  @Memoize({ maxAge: 30000 }) // 30 second
  async getEthereumUsdValue(): Promise<number> {
    const reqUrl =
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2C&vs_currencies=usd';

    const response: AxiosResponse<any> = await firstValueFrom(
      await this.httpService.get<any>(reqUrl, {
        validateStatus: () => true,
      }),
    );

    const { status, data } = response;

    /**
     * ERROR CASE
     */
    if (status !== 200) {
      throw new Error(
        `Error on getEthereumUsdtValue, status:${status} 
          data:${JSON.stringify(data, null, 2)}`,
      );
    }

    const value = data.ethereum.usd;

    return value;
  }

  abstract getBalances(addresses: string[]): Promise<IBalance[]>;
}
