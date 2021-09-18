import * as React from "react"
/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import cn from "classnames"
import LocaleContext from "../shared/context/localeContext"

import { WidthWrapper, ArticleContainer } from "./IncomeStrategies"

const StyledList: React.FunctionComponent<any> = ({ children }) => (
  <li className="flex h-16">{children}</li>
)
const StyledListContent: React.FunctionComponent<any> = ({
  className,
  children,
}) => (
  <div
    className={cn(
      className,
      "flex justify-center  px-2 pt-1 md:pt-0 text-base text-black-0 absolute h-16 ml-8"
    )}
  >
    {children}
  </div>
)

const CircleNumber: React.FunctionComponent<any> = ({ children }) => (
  <div
    className="flex justify-center items-center text-base text-black-0"
    css={css`
      position: relative;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      border: 1px solid;
      border-color: black;
      :before {
        position: absolute;
        content: "";
        display: block;
        z-index: 1;
        top: 100%;
        left: 50%;
        border: 1px dotted;
        border-width: 0 0 0 1px;
        width: 1px;
        height: 2rem;
        :last-child {
          content: none;
        }
      }
    `}
  >
    {children}
  </div>
)

export default () => {
  const locale: any = React.useContext(LocaleContext)

  const fundsInfo = (language: string) =>
    language === "en-CA"
      ? [
          {
            name: "PYF",
            url: `/funds/PYF`,
            note: "Generate a stable yield using deep out of the money puts.",
            feature1: `A lower-risk source of alternative yield`,
            feature2: `Options written 8-10% out of the money`,
            feature3: `Stable yield with low volatility and low correlation to equity markets`,
          },
          {
            name: "PAYF",
            url: `/funds/PAYF`,
            note:
              "Diversify your equity holdings using closer to the money puts.",
            feature1: `A medium-risk equity diversifier with an emphasis on yield`,
            feature2: `Options written 3-5% out of the money`,
            feature3: `Higher yield generated through tighter correlation to equity markets`,
          },
        ]
      : [
          {
            name: "PYF",
            url: `/funds/PYF`,
            note:
              "Générer un rendement stable au moyen d’options de vente à un prix d’exercice très inférieur au cours des actifs sous-jacents.",
            feature1: `Une source de rendement alternatif à plus faible risque`,
            feature2: `Options vendues de 8 à 10 % en dehors de la monnaie`,
            feature3: `Rendement stable avec faible volatilité et faible corrélation avec les marchés des actions`,
          },
          {
            name: "PAYF",
            url: `/funds/PAYF`,
            note:
              "Diversifiez votre portefeuille d’actions au moyen d’options de vente plus près de la monnaie.",
            feature1: `Une diversification d’actions à risque moyen axée sur le rendement`,
            feature2: `Options vendues de 3 à 5 % en dehors de la monnaie`,
            feature3: `Un rendement plus élevé généré par une corrélation plus étroite avec les marchés des actions            `,
          },
        ]

  return (
    <React.Fragment>
      <WidthWrapper>
        <Tabs className="w-full">
          <TabList>
            <Tab>
              {locale.language === "en-CA"
                ? "Purpose Premium Yield Fund "
                : "Fonds á revenu élevé Purpose "}
              | PYF
            </Tab>
            <Tab>
              {locale.language === "en-CA"
                ? "Purpose Enhanced Premium Yield Fund "
                : "Fonds à rendement majoré Purpose "}
              | PAYF
            </Tab>
          </TabList>

          {fundsInfo(locale.language).map(fund => {
            return (
              <TabPanel key={fund.name}>
                <div className="w-full flex flex-wrap py-4">
                  <ArticleContainer className="text-left pr-2 text-black-0">
                    <h4>{fund.note}</h4>
                    <a href={fund.url} className="my-4">
                      {locale.language === "en-CA"
                        ? `Visit ${fund.name} fund page for more details ↗`
                        : `Visitez la page de fonds ${fund.name} pour en savoir plus ↗↗`}
                    </a>
                  </ArticleContainer>
                  <ArticleContainer className="md:mt-4">
                    <ol>
                      <StyledList className="flex h-16">
                        <CircleNumber>1</CircleNumber>
                        <StyledListContent>{fund.feature1}</StyledListContent>
                      </StyledList>
                      <StyledList>
                        <CircleNumber>2</CircleNumber>
                        <StyledListContent>{fund.feature2}</StyledListContent>
                      </StyledList>
                      <StyledList className="flex h-16">
                        <div
                          className="flex justify-center items-center text-base text-black-0"
                          css={css`
                            position: relative;
                            height: 2rem;
                            width: 2rem;
                            z-index: 1;
                            border-radius: 50%;
                            border: 1px solid;
                            border-color: black;
                          `}
                        >
                          3
                        </div>
                        <StyledListContent className="absolute h-16 ml-8">
                          {fund.feature3}
                        </StyledListContent>
                      </StyledList>
                    </ol>
                  </ArticleContainer>
                </div>
              </TabPanel>
            )
          })}
        </Tabs>
      </WidthWrapper>
    </React.Fragment>
  )
}
