/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import stringToUnderscore from "../../../utils/stringToUnderscore"

const RSC = dynamic(import("react-scrollbars-custom"))

const MAP_PRODUCT_ASSETS: { [key: string]: any } = {
  Cash: "Cash",
  Alternatives: "Alternatives",
  "Active Fixed Income": "Active Fixed Income",
  Privates: "Private Assets",
  Equities: "Equity",
  "Multi-Asset Class": "Multi-Asset Class",
  Commodities: "Commodities",
  Trésoreries: "Trésoreries",
  "Produits liquides non traditionnels": "Produits liquides non traditionnels",
  "Titres à revenu fixe sous gestion active":
    "Titres à revenu fixe sous gestion active",
  "Actifs privés": "Actifs privés",
  "Actions sous gestion active": "Actions sous gestion active",
  "Catégorie d’actifs mixtes": "Catégorie d’actifs mixtes",
  Marchandises: "Marchandises",
}

type RightSectionProps = {
  className: any
  landingPageData: LandingPageData
}

const RightSection: React.FunctionComponent<RightSectionProps> = ({
  className,
  landingPageData,
}) => {
  var imgFormat: any = "jpg"
  var imgSize = 600
  if (process.browser) {
    imgSize = imgSize * window.devicePixelRatio
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }
  return (
    <RSC
      className={className + " pl-10 pr-16"}
      rtl={true}
      css={css`
        @media only screen and (max-width: 768px) {
          display: none;
        }
        & .ScrollbarsCustom-Wrapper {
          height: 100%;
          width: 80%;
        }
        & .ScrollbarsCustom-TrackY {
          position: absolute;
          overflow: hidden;
          border-radius: 4px;
          background: #1a2322;
          user-select: none;
          width: 10px;
          height: calc(100% - 30%);
          top: 15%;
          left: 0px;
        }
        & .ScrollbarsCustom-ThumbY {
          touch-action: none;
          cursor: pointer;
          border-radius: 4px;
          background: white;
          width: 100%;
          height: 41.7391px;
          transform: translateY(0px);
        }
      `}
      noDefaultStyles={true}
    >
      {landingPageData &&
        landingPageData.fields &&
        landingPageData.fields.products.map((product, index) => (
          <Link
            href={{
              pathname: "/invest",
              query: {
                goto: `${stringToUnderscore(
                  MAP_PRODUCT_ASSETS[product.fields.productTitle]
                )}`,
              },
            }}
            key={index}
          >
            <div
              className="px-10 py-16 text-center bg-cover bg-center"
              css={css`
                  background-image: url("${product.fields.productBackgroundImage
                    .fields.file.url +
                    "?fm=" +
                    imgFormat +
                    "&w=" +
                    imgSize +
                    "&q=80"}");
                `}
            >
              <h4
                className="font-bold text-white uppercase font-opensans"
                css={css`
                  transition: all 380ms ease-in-out;
                  letter-spacing: 0px;
                  color: #f3f3f3;

                  &:hover {
                    cursor: pointer;
                    letter-spacing: 1px;
                    color: #fff;
                    text-shadow: 5px 5px 20px rgba(51, 67, 66, 0.55);
                    transform: translateY(-1px);
                  }
                `}
              >
                {product.fields.productTitle}
              </h4>
            </div>
          </Link>
        ))}
    </RSC>
  )
}

export default RightSection
