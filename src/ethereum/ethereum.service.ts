import { Memoize } from '../common/decarators/memoize.decarator';
import { isAddress } from 'web3-utils';
import { EtherUnit, IBalance } from './ethereum.interface';
import BigNumber from 'bignumber.js';

export abstract class EthereumService {
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

  abstract getBalances(addresses: string[]): Promise<IBalance[]>;
}
