import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { EtherUnit } from './ethereum.interface';
import { EtherScanService } from './etherscan.service';

describe('EtherScanService', () => {
  let service: EtherScanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [EtherScanService],
    }).compile();

    service = module.get<EtherScanService>(EtherScanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateAddress - Ethereum Address Validator', () => {
    expect(
      service.validateAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d'),
    ).toBe(true);

    expect(
      service.validateAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D'),
    ).toBe(true);

    expect(
      service.validateAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'),
    ).toBe(true);

    expect(
      service.validateAddress('0xB7e390864a90b7b923C9f9310C6F98aafE43F707'),
    ).toBe(true);

    expect(
      service.validateAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'),
    ).toBe(false);

    expect(service.validateAddress('abcxtu')).toBe(false);
  });

  it('unitConverter - Ether Unit Converter', () => {
    expect(
      service.unitConverter(
        22277171931976772258,
        EtherUnit.Wei,
        EtherUnit.Ether,
      ),
    ).toBe(22.277171931976772258);

    expect(
      service.unitConverter(
        22.277171931976772258,
        EtherUnit.Ether,
        EtherUnit.Wei,
      ),
    ).toBe(22277171931976772258);

    expect(service.unitConverter(1005, EtherUnit.GWei, EtherUnit.Wei)).toBe(
      1005000000000,
    );

    expect(
      service.unitConverter(551235.7, EtherUnit.Szabo, EtherUnit.GEther),
    ).toBe(0.0000000005512357);

    expect(service.unitConverter(0, EtherUnit.Finney, EtherUnit.KEther)).toBe(
      0,
    );
  });
});
