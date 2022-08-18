import { ArrayMinSize, IsArray, IsString } from 'class-validator';
import { IBalance } from './ethereum.interface';

export class GetBalancesRequestDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  addresses: string[];
}

export class GetBalancesReponseDTO implements IBalance {
  address: string;
  valid = true;
  balance: string = null;
}
