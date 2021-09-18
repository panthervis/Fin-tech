import * as React from "react"
import LocaleContext from "../shared/context/localeContext"

import { WidthWrapper } from "./IncomeStrategies"

export default () => {
  const locale: any = React.useContext(LocaleContext)

  const fundsInfo = (language: string) => [
    {
      title:
        language === "en-CA"
          ? "Purpose Premium Yield Fund"
          : "Fonds á revenu élevé Purpose",
      term: `ETF ticker: PYF on the TSX<br/>Class F: PFC2301<br/>Class A: PFC2300<br/><br/>${
        locale.language === "en-CA"
          ? "Also available in non-FX hedged (PYF.B) and USD (PYF.U) versions"
          : "Aussi offertes en versions sans couverture de change (PYF.B) et en dollars américains (PYF.U)"
      }`,
    },
    {
      title:
        language === "en-CA"
          ? "Purpose Enhanced Premium Yield Fund"
          : "Fonds à rendement majoré Purpose",
      term: `ETF ticker: PAYF on the TSX<br/>Class F: PFC4401<br/>Class A: PFC4400`,
    },
  ]

  const title = locale.language === "en-CA" ? "How to buy" : "Comment acheter"
  const titleNote =
    locale.language === "en-CA"
      ? "Advisors, please contact your rep or "
      : "Conseillers, veuillez communiquer avec votre représentant ou "
  return (
    <WidthWrapper>
      <h1 className="text-black-0">{title}</h1>

      <div className="my-4">
        {titleNote}
        <span className="text-black-0">
          <a href="mailto:sales@purposeinvest.com">
            {locale.language === "en-CA" ? "email us." : "écrivez-nous."}
          </a>
        </span>
      </div>

      <div className="flex justify-center my-6 text-2xs">
        {fundsInfo(locale.language).map(fund => (
          <div
            key={fund.title}
            className="flex flex-col items-center text-center"
          >
            <h3 className="leading-tight">{fund.title}</h3>
            <div
              className="my-4 text-black-0 leading-normal"
              dangerouslySetInnerHTML={{ __html: fund.term }}
            />
          </div>
        ))}
      </div>
    </WidthWrapper>
  )
}
