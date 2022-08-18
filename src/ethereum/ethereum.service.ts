import { Memoize } from '../common/decarators/memoize.decarator';
import { isAddress } from 'web3-utils';
import { EtherUnit, IBalance } from './ethereum.interface';

export abstract class EthereumService {
  @Memoize()
  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  @Memoize()
  unitConverter(b: number | bigint, from: EtherUnit, to: EtherUnit): number {
    const pow = Number(from) - Number(to);

    return Number(b) * Math.pow(10, pow);
  }

  abstract getBalances(addresses: string[]): Promise<IBalance[]>;
}
