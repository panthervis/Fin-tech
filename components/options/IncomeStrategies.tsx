/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import cn from "classnames"

import LocaleContext from "../shared/context/localeContext"

const Banner: React.FunctionComponent<any> = ({ children }) => {
  return (
    <React.Fragment>
      <div
        className="bg-teal-1 text-white  bg-cover bg-center flex flex-col justify-end items-center text-center mx-auto pt-36"
        css={css`
          padding-top: 7rem;
          min-height: 500px;
        `}
      >
        {children}
      </div>
    </React.Fragment>
  )
}

export const WidthWrapper: React.FunctionComponent<any> = ({ children }) => (
  <div
    className="flex flex-col items-center w-full text-gray-21 text-xs font-thin my-8 px-12 md:px-12 md:text-sm"
    css={css`
      margin: 0rem auto;
      max-width: 1140px;
    `}
  >
    {children}
  </div>
)

export const ArticleContainer: React.FunctionComponent<any> = ({
  className,
  children,
}) => (
  <div className={cn(className, "flex flex-col w-1/2 md:w-full")}>
    {children}
  </div>
)

const IncomeStrategies: React.FunctionComponent = () => {
  const locale: any = React.useContext(LocaleContext)

  const incomeStrategies = (language: string) =>
    language === "en-CA"
      ? [
          "Cash-covered put selling mines volatility from a portfolio of stocks we love",
          "Stocks selected based on screens of quality, value and sentiment factors",
          " No leverage and tight risk management",
          "Monthly distributions",
          "Tax-efficient corporate class structure",
        ]
      : [
          "La vente d’options de vente de couverture en espèces réduit la volatilité d’un portefeuille",
          "Les actions sont sélectionnées en fonction de facteurs de qualité, de valeur, ainsi que sur les sentiments.",
          "Aucun effet de levier et aucune gestion rigoureuse des risques.",
          "Distributions mensuelles.",
          "Structure de catégorie de société fiscalement avantageuse.",
        ]

  const title =
    locale.language === "en-CA"
      ? "Options Income Strategies"
      : "Stratégies de revenus d’options"
  const titleNote =
    locale.language === "en-CA"
      ? `Think of options like they’re insurance policies. It can be beneficial to be a buyer or a seller of options, depending on your investment objective. Our cash-covered put writing strategies earn premiums by selling protection on high-quality companies, giving your portfolio an income-generating edge.`
      : `Voyez les options comme des polices d’assurance. Il peut être avantageux d’être un acheteur ou un vendeur d’options, selon votre objectif de placement. Nos stratégies de vente d’options de vente de couverture en espèces touchent des primes par la vente de protection d’entreprises de qualité supérieure, conférant à votre portefeuille un avantage producteur de revenus.`
  const buttonContext =
    locale.language === "en-CA"
      ? " Q&A: using options for income"
      : "Questions et réponses : Utilisation des options comme source de revenus"

  return (
    <React.Fragment>
      <Banner>
        <h1 className="font-tiempos leading-none mt-2 px-20 md:px-0">
          {title}
        </h1>
        <h6 className="font-tiempos leading-none text-gray-1 my-6 px-16 py-2  leading-normal">
          {titleNote}
        </h6>
        <a className="mb-12" href="#QNA">
          <button className="border rounded-xs text-xs px-4 py-1 focus:outline-none  hover:border-black-0">
            {buttonContext}
          </button>
        </a>
      </Banner>
      <WidthWrapper>
        <div className="flex w-full flex-wrap my-8">
          <ArticleContainer>
            <div className="flex justify-center w-full h-full pr-4 md:my-4">
              <iframe
                src="https://www.youtube.com/embed/yqG8vm5HJgI"
                css={css`
                  width: 100%;
                  height: 100%;
                  min-height: 266px;
                `}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </ArticleContainer>
          <ArticleContainer>
            <h4 className="text-black-0 leading-tight mb-4">
              {locale.language === "en-CA"
                ? "About our options income strategies"
                : `À propos de nos stratégies de revenus d’options`}
            </h4>
            {incomeStrategies(locale.language).map((strategy, index) => (
              <li className="text-2xs md:text-sm leading-normal" key={index}>
                {strategy}
              </li>
            ))}
          </ArticleContainer>
        </div>
      </WidthWrapper>
    </React.Fragment>
  )
}

export default IncomeStrategies
