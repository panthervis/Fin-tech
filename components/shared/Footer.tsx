/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import Button from "./Button"
import Link from "next/link"
import PurposeLogo from "./footer/purposeLogo.svg"
import TwitterIcon from "../../public/icon-twitter.svg"
import LinkedInIcon from "../../public/icon-linkedin.svg"
import LocaleContext from "../shared/context/localeContext"

const Footer: React.FunctionComponent = () => {
  const locale: any = React.useContext(LocaleContext)
  const contentMap = {
    "en-CA": {
      header: "Want to talk",
      body: "We'd love to hear from you.",
      cta: "Contact Us",
      aboutUs: "About us",
      ourStory: "Our Story",
      ourTeam: "Our Team",
      careers: "Careers",
      news: "News",
      data: "Data",
      disclaimer: "Disclaimer",
      privacyPolicy: "Privacy Policy",
      legal: "Legal",
      fundDocuments: "Fund Documents",
      terminatedFunds: "Terminated Funds",
    },
    "fr-CA": {
      header: "Voulez-vous parler à quelqu’un",
      body: "Nous aimerions recevoir de vos nouvelles.",
      cta: "Nous joindre",
      aboutUs: "Découvrir Purpose",
      ourStory: "Notre histoire",
      ourTeam: "Notre équipe",
      careers: "Carrières",
      news: "Actualités",
      data: "Données",
      disclaimer: "Avis de non-responsabilité",
      privacyPolicy: "Politique de confidentialité",
      legal: "Mentions légales",
      fundDocuments: "Documents relatifs aux fonds",
      terminatedFunds: "Fonds résiliés",
    },
  }
  return (
    <div className="p-20 md:p-10">
      <PurposeLogo />
      <div className="flex flex-wrap pt-16">
        <div className="w-1/3 md:w-full">
          <p
            className="font-tiemposMedium text-3xl leading-none mb-1"
            css={css`
              max-width: 15rem;
            `}
          >
            {locale.language === "fr-CA"
              ? contentMap["fr-CA"].header
              : contentMap["en-CA"].header}
          </p>
          <p className="font-opensans text-xs">
            {locale.language === "fr-CA"
              ? contentMap["fr-CA"].body
              : contentMap["en-CA"].body}
          </p>
          <Link href="/contact">
            <a>
              <Button
                className="my-8 md:py-4 text-sm color-teal-1 relative bg-white border-1 border-transparent font-bold font-opensans"
                css={css`
                background-size: 200% auto;
                transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                background-image: linear-gradient(
                    rgba(255, 255, 255, 0),
                    rgba(255, 255, 255, 0)
                  ),
                  linear-gradient(101deg, #E2D8B2, #98d3e7 51%, #E2D8B2 100%);
                  linear-gradient(101deg, #e2d8b2, #98d3e7 51%, #e2d8b2 100%);
                background-origin: border-box;
                background-clip: content-box, border-box;
                box-shadow: 2px 1000px 1px #fff inset;
                &:hover {
                  background-position: right center;
                  transform: translateY(-2px);

                }
              `}
              >
                {locale.language === "fr-CA"
                  ? contentMap["fr-CA"].cta
                  : contentMap["en-CA"].cta}
              </Button>
            </a>
          </Link>
        </div>
        <div className="w-2/3 md:w-full text-xs">
          <div className="flex items-center md:hidden">
            <p className="relative mr-3 font-opensans">
              {locale.language === "fr-CA"
                ? contentMap["fr-CA"].aboutUs
                : contentMap["en-CA"].aboutUs}
            </p>
            <div
              className="z-10 text-transparent bg-gray-1"
              css={css`
                width: 70%;
                height: 1px;
              `}
            ></div>
          </div>
          <div
            className="text-xs flex flex-no-wrap md:flex-wrap-reverse"
            css={css`
              a {
                transition: all 300ms ease-out;
              }
            `}
          >
            <div className="w-1/4 text-xs md:hidden">
              <div className="mb-3 mt-5 text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/about">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].ourStory
                      : contentMap["en-CA"].ourStory}
                  </a>
                </Link>
              </div>
              <div className="mb-3 text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/teams">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].ourTeam
                      : contentMap["en-CA"].ourTeam}
                  </a>
                </Link>
              </div>
              <div className="mb-3 text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/careers">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].careers
                      : contentMap["en-CA"].careers}
                  </a>
                </Link>
              </div>
              <div className="mb-3 text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/thoughtful">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].news
                      : contentMap["en-CA"].news}
                  </a>
                </Link>
              </div>
            </div>
            <div
              className="w-1/4 md:w-full text-xs md:pl-0 md:text-lg "
              css={css`
                a {
                  transition: all 300ms ease-out;
                }
              `}
            >
              <div className="mb-3 mt-5 md:mt-0 text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/disclaimer">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].disclaimer
                      : contentMap["en-CA"].disclaimer}
                  </a>
                </Link>
              </div>
              <div className="mb-3 text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/privacy">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].privacyPolicy
                      : contentMap["en-CA"].privacyPolicy}
                  </a>
                </Link>
              </div>
              <div className="mb-3 text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/legal">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].legal
                      : contentMap["en-CA"].legal}
                  </a>
                </Link>
              </div>
              <div className="mb-3 sm:hidden text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/fund-documents">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].fundDocuments
                      : contentMap["en-CA"].fundDocuments}
                  </a>
                </Link>
              </div>
              <div className="mb-3 sm:hidden text-teal-1 opacity-60 hover:opacity-90 font-opensans">
                <Link href="/terminated-funds">
                  <a>
                    {locale.language === "fr-CA"
                      ? contentMap["fr-CA"].terminatedFunds
                      : contentMap["en-CA"].terminatedFunds}
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-2/4 md:w-full text-xs md:pl-0 md:text-lg">
              <div className="mb-3 mt-5 md:mt-0 flex text-right">
                <div className="flex mr-2">
                  <a
                    href="https://www.linkedin.com/company/purpose-investments/"
                    className="text-teal-1 hover:opacity-100 opacity-60"
                    target="_blank"
                    rel="noopener"
                    css={css`
                      transition: all 300ms ease-out;
                    `}
                  >
                    <LinkedInIcon
                      style={{
                        fill: "#334342",
                        fillOpacity: ".6",
                      }}
                    />
                  </a>
                </div>
                <div className="flex">
                  <a
                    href="https://twitter.com/purposeinvest"
                    className="text-teal-1 hover:opacity-100 opacity-60"
                    target="_blank"
                    rel="noopener"
                    css={css`
                      transition: all 300ms ease-out;
                    `}
                  >
                    <TwitterIcon
                      style={{
                        fill: "#334342",
                        fillOpacity: ".6",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        className="font-opensans text-gray-3"
        css={css`
          font-size: 0.58rem;
          @media (max-width: 420px) {
            font-size: 0.85rem;
          }
        `}
      >
        © 2020 Purpose Investments Inc. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
