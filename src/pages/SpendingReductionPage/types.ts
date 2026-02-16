export type TaxLevels = {
  taxLevels: TaxLevelPerSpendingCategory;
};

export type TaxLevelPerSpendingCategory = {
  taxTaxExpenditure: number;
  taxEducation: number;
  taxDefense: number;
  taxResearch: number;
  taxSolidarity: number;
  taxEcology: number;
};
