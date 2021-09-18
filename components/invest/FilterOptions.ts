import { fundCategoriesInFr } from "../shared/FundCategories"

export const investForOptions = [
  { value: "any", label: "Any outcome" },
  { value: "Growth", label: "Growth" },
  { value: "Tax efficiency", label: "Tax efficiency" },
  { value: "Diversification", label: "Diversification" },
  { value: "Capital preservation", label: "Capital preservation" },
  { value: "Income", label: "Income" },
  { value: "Inflation protection", label: "Inflation protection" },
]

export const assetClassOptions = [
  { value: "any", label: "Anything" },
  { value: "Alternatives", label: "Alternatives" },
  { value: "Active fixed income", label: "Active fixed income" },
  { value: "Equity", label: "Equity" },
  { value: "Private assets", label: "Private assets" },
  { value: "Multi-asset class", label: "Multi-asset class" },
  { value: "Cash", label: "Cash" },
  { value: "Commodities", label: "Commodities" },
]

export const managerOptions = [
  { value: "any", label: "Any manager" },
  { value: "Purpose Investments", label: "Purpose Investments" },
  { value: "Sandy Liang", label: "Sandy Liang, Purpose Investments" },
  { value: "Greg Taylor", label: "Greg Taylor, Purpose Investments" },
  {
    value: "Bruce Campbell",
    label: "Bruce Campbell, StoneCastle Investment Management",
  },
  {
    value: "Norm Lamarche",
    label: "Norm Lamarche, Kawartha Asset Management",
  },
  { value: "Craig Basinger", label: "Craig Basinger, Connected Wealth" },
  { value: "Norman Milner", label: "Norman Milner, Neuberger Berman" },
  { value: "Nate Kush", label: "Nate Kush, Neuberger Berman" },
  {
    value: "Neuberger Berman Breton Hill",
    label: "Neuberger Berman Breton Hill",
  },
]

export const regionOptions = [
  { value: "any", label: "Any Region" },
  { value: "Global", label: "Global" },
  { value: "Canada", label: "Canada" },
  { value: "US", label: "US" },
]

export const investForOptionsInFr = [
  { value: "any", label: "Montrer tous" },
  { value: "Yield", label: "Rendement" },
  { value: "Growth", label: "Croissance" },
  { value: "Tax efficiency", label: "Efficacité fiscale" },
  { value: "Diversification", label: "Diversification" },
  { value: "Capital preservation", label: "Préservation du capital" },
  { value: "Preservation", label: "Préservation" },
  { value: "Inflation protection", label: "Protection contre l’inflation" },
]

export const assetClassOptionsInFr = [
  { value: "any", label: fundCategoriesInFr["any"] },
  { value: "Alternatives", label: fundCategoriesInFr["alternatives"] },
  {
    value: "Active fixed income",
    label: fundCategoriesInFr["active fixed income"],
  },
  { value: "Equity", label: fundCategoriesInFr["equity"] },
  { value: "Private assets", label: fundCategoriesInFr["private assets"] },
  {
    value: "Multi-asset class",
    label: fundCategoriesInFr["multi-asset class"],
  },
  { value: "Cash", label: fundCategoriesInFr["cash"] },
  { value: "Commodities", label: fundCategoriesInFr["commodities"] },
]

export const managerOptionsInFr = [
  { value: "any", label: "Montrer tous" },
  { value: "Purpose Investments", label: "Purpose Investments" },
  { value: "Sandy Liang", label: "Sandy Liang, Purpose Investments" },
  { value: "Greg Taylor", label: "Greg Taylor, Purpose Investments" },
  {
    value: "Bruce Campbell",
    label: "Bruce Campbell, StoneCastle Investment Management",
  },
  {
    value: "Norm Lamarche",
    label: "Norm Lamarche, Kawartha Asset Management",
  },
  { value: "Craig Basinger", label: "Craig Basinger, Connected Wealth" },
  { value: "Norman Milner", label: "Norman Milner, Neuberger Berman" },
  { value: "Nate Kush", label: "Nate Kush, Neuberger Berman" },
  {
    value: "Neuberger Berman Breton Hill",
    label: "Neuberger Berman Breton Hill",
  },
]

export const regionOptionsInFr = [
  { value: "any", label: "Montrer tous" },
  { value: "Global", label: "Mondiale" },
  { value: "Canada", label: "Canada" },
  { value: "US", label: "É.-U." },
]
