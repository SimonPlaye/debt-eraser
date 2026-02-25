export type TaxLevels = {
  taxLevels: TaxLevelPerSpendingCategory;
};

export type TaxLevelPerSpendingCategory = {
  taxTaxLoopholes: number;
  taxEducation: number;
  taxDefense: number;
  taxResearch: number;
  taxSolidarity: number;
  taxEcology: number;
};
