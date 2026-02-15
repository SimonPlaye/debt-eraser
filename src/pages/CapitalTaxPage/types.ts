export type TaxLevels = {
  taxLevels: TaxLevelPerWealthGroup;
};

export type TaxLevelPerWealthGroup = {
  taxLevelGroup1mTo5m: number;
  taxLevelGroup5mTo10m: number;
  taxLevelGroup10mTo50m: number;
  taxLevelGroup50mTo100m: number;
  taxLevelGroup100mTo500m: number;
  taxLevelGroupFrom500m: number;
};
