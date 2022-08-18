export interface IBalance {
  address: string;
  balance: string;
}

export enum EtherUnit {
  Wei = -18,
  KWei = -15,
  MWei = -12,
  GWei = -9,
  Szabo = -6,
  Finney = -3,
  Ether = 0,
  KEther = 3,
  MEther = 6,
  GEther = 9,
  TEther = 12,
}
