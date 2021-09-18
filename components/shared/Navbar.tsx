/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import LockIcon from "./navbar/lock.svg"
import LockIconDark from "../../public/lock-dark.svg"
import NavbarLink from "./navbar/NavbarLink"
import PurposeLogo from "./navbar/purpose-logo.svg"
import PurposeLogoDark from "../../public/purpose-logo-dark.svg"
import SearchIcon from "./navbar/search.svg"
import SearchIconDark from "../../public/search-dark.svg"
import HamburgerMenuIcon from "./navbar/hamburgerMenu.svg"
import HamburgerMenuIconDark from "./navbar/hamburger-menu.svg"
import HomeIcon from "./navbar/home.svg"
import { LocaleConsumer } from "./context/localeContext"
import SearchBar from "./navbar/SearchBar"
import cn from "classnames"

const NavbarLinkGroup: React.FunctionComponent<any> = ({
  scrolled,
  transparent,
}) => {
  const router = useRouter()
  const pathname = router.pathname
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSearchBarVisible, setIsSearchBarVisible] = React.useState(false)

  return (
    <LocaleConsumer>
      {({ language, setLanguage }: any) => (
        <>
          {/* search bar */}
          {isSearchBarVisible && (
            <SearchBar onClose={() => setIsSearchBarVisible(false)} />
          )}
          <div>
            {scrolled ? (
              <HamburgerMenuIconDark
                className="hidden"
                css={css`
                  @media only screen and (max-width: 942px) {
                    display: block;
                  }
                `}
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }}
              />
            ) : (
              <HamburgerMenuIcon
                className="hidden"
                css={css`
                  @media only screen and (max-width: 942px) {
                    display: block;
                  }
                `}
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }}
              />
            )}

            <ul
              className="flex justify-between items-center relative text-xs"
              css={css`
                .nav-link-group {
                  position: relative;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  .nav-underline {
                    height: 1px;
                    background: ${scrolled ? "#aeaeae" : "#ffffff"};
                    opacity: 0.5;
                    position: absolute;
                    bottom: -9px;
                    width: 94%;
                  }
                }
                @media only screen and (max-width: 942px) {
                  display: none;
                }
              `}
            >
              <div className="nav-link-group">
                <span className="nav-underline" />
                {language === "en-CA" ? (
                  <>
                    <NavbarLink
                      href="/thoughtful"
                      active={pathname === "/thoughtful" ? true : false}
                      scrolled={scrolled}
                    >
                      Thoughtful
                    </NavbarLink>
                    <NavbarLink
                      href="/canadians"
                      active={pathname === "/canadians" ? true : false}
                      scrolled={scrolled}
                    >
                      Canadians
                    </NavbarLink>
                  </>
                ) : (
                  <>
                    <NavbarLink
                      href="/canadians"
                      active={pathname === "/canadians" ? true : false}
                      scrolled={scrolled}
                    >
                      Les Canadiens
                    </NavbarLink>
                    <NavbarLink
                      href="/thoughtful"
                      active={pathname === "/thoughtful" ? true : false}
                      scrolled={scrolled}
                    >
                      réfléchis
                    </NavbarLink>
                  </>
                )}
                <NavbarLink
                  href="/invest"
                  active={pathname === "/invest" ? true : false}
                  scrolled={scrolled}
                >
                  {language === "en-CA" ? "Invest" : "investissent"}
                </NavbarLink>
                <NavbarLink
                  href="/about"
                  active={
                    pathname === "/teams" ||
                    pathname === "/careers" ||
                    pathname === "/about"
                      ? true
                      : false
                  }
                  scrolled={scrolled}
                >
                  <span className="font-tiempos italic font-thin opacity-50">
                    {language === "en-CA" ? "with" : "avec"}
                  </span>{" "}
                  Purpose
                </NavbarLink>
              </div>
              <a href="https://advisor.purposeinvest.com/" className="m-2">
                <button
                  className={cn(
                    "bg-transparent rounded border hover:border-transparent px-4 py-1 ml-2 flex items-center font-opensans",
                    scrolled
                      ? "hover:bg-gray-900 hover:text-gray-100"
                      : "hover:bg-white hover:text-gray-900"
                  )}
                  css={css`
                    display: ${transparent && !scrolled ? "none" : "auto"};
                    transition: 0.3s;
                    svg path {
                      transition: all 300ms ease-out;
                    }
                    &:hover svg path {
                      fill: ${scrolled ? "white" : "black"};
                    }
                  `}
                >
                  {scrolled ? (
                    <LockIconDark className="mr-2" />
                  ) : (
                    <LockIcon className="mr-2" />
                  )}
                  {language === "en-CA" ? "Advisors" : "Conseillers"}
                </button>
              </a>

              {/* Search button */}
              <button
                onClick={() =>
                  pathname !== "/search" && setIsSearchBarVisible(true)
                }
                className="ml-5 cursor-pointer hover:opacity-60"
                css={css`
                  transition: all 300ms ease-out;
                `}
              >
                {scrolled ? (
                  <SearchIconDark className="w-5" />
                ) : (
                  <SearchIcon
                    className="w-5 h-5"
                    css={css`
                      & path {
                        fill: #fff;
                      }
                    `}
                  />
                )}
              </button>

              {/* Language switch button */}
              <a
                className="cursor-pointer ml-5 hover:opacity-70 font-opensans font-bold"
                css={css`
                  transition: all 300ms ease-out;
                `}
                onClick={() => {
                  const targetLanguage =
                    language === "en-CA" ? "fr-CA" : "en-CA"
                  setLanguage(targetLanguage)
                }}
              >
                {language === "en-CA" ? "FR" : "EN"}
              </a>
            </ul>
            {isMobileMenuOpen && (
              <div
                className="w-full h-full block fixed left-0 top-0 bg-black-1"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                }}
              >
                <div className="w-5/6 h-7/10 fixed block left-1/2 top-1">
                  <div className="w-full h-full py-1 rounded block relative text-2xl bg-white -left-1/2 text-teal-1">
                    <div className="flex flex-row ml-12 mt-4 leading-none">
                      <div className="p-4 pl-0 pb-2">
                        <Link href="/">
                          <HomeIcon className="w-6" />
                        </Link>
                      </div>
                      {/* Search button */}
                      <div
                        className="p-4 pb-2 leading-none"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          pathname !== "/search" && setIsSearchBarVisible(true)
                        }}
                      >
                        <SearchIconDark className="w-6" />
                      </div>
                    </div>

                    {language === "en-CA" ? (
                      <>
                        <div
                          className="mt-5 pb-5 px-10"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <NavbarLink
                            className="block"
                            href="/thoughtful"
                            active={pathname === "/thoughtful" ? true : false}
                          >
                            Thoughtful
                          </NavbarLink>
                        </div>
                        <div
                          className="mt-5 pb-5 px-10"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <NavbarLink
                            className="block"
                            href="/canadians"
                            active={pathname === "/canadians" ? true : false}
                          >
                            Canadians
                          </NavbarLink>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="mt-5 pb-5 px-10"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <NavbarLink
                            className="block"
                            href="/canadians"
                            active={pathname === "/canadians" ? true : false}
                          >
                            Les Canadiens
                          </NavbarLink>
                        </div>
                        <div
                          className="mt-5 pb-5 px-10"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <NavbarLink
                            className="block"
                            href="/thoughtful"
                            active={pathname === "/thoughtful" ? true : false}
                          >
                            réfléchis
                          </NavbarLink>
                        </div>
                      </>
                    )}
                    <div
                      className="mt-5 pb-5 px-10"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <NavbarLink
                        className="block"
                        href="/invest"
                        active={pathname === "/invest" ? true : false}
                      >
                        {language === "en-CA" ? "Invest" : "investissent"}
                      </NavbarLink>
                    </div>
                    <div
                      className="mt-5 pb-5 px-10 leading-none"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <div
                        className="italic opacity-50 font-light font-tiempos"
                        css={css`
                          margin-left: 0.58rem;
                        `}
                      >
                        {language === "en-CA" ? "with" : "avec"}
                      </div>
                      <NavbarLink
                        className="block"
                        href="/about"
                        active={pathname === "/about" ? true : false}
                      >
                        Purpose
                      </NavbarLink>
                    </div>
                    <div
                      className="mt-5 pb-5 px-10 leading-none"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <a
                        className="cursor-pointer font-bold"
                        onClick={() => {
                          const targetLanguage =
                            language === "en-CA" ? "fr-CA" : "en-CA"
                          setLanguage(targetLanguage)
                        }}
                        css={css`
                          margin: 0.27rem 0.58rem;
                        `}
                      >
                        {language === "en-CA" ? "FR" : "EN"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </LocaleConsumer>
  )
}

const Navbar: React.FunctionComponent<any> = ({
  transparent = true,
  scrolled,
}) => (
  <React.Fragment>
    <div className="w-0 h-0 overflow-hidden">
      {/* rendering child svgs of fixed parent doesn't work on ie11, so prerendering is required */}
      <PurposeLogoDark />
      <SearchIconDark />
    </div>

    <nav
      className={cn(
        transparent && !scrolled
          ? "text-white pt-8"
          : "text-black py-2 pt-8 bg-gray-22",
        "px-20 md:px-6 flex flex-wrap absolute items-center w-full z-30 justify-between",
        scrolled ? "hidden" : "bg-transparent"
      )}
    >
      <Link href="/">
        <a className="flex flex-shrink-0">
          {scrolled ? <PurposeLogoDark /> : <PurposeLogo />}
        </a>
      </Link>
      <NavbarLinkGroup scrolled={scrolled} />
    </nav>
    <nav
      css={css`
        visibility: ${transparent && !scrolled ? "hidden" : "visible"};
        position: fixed;
        top: ${scrolled ? "0px" : "-115px"};
        transition: top 0.4s ease-in-out;
      `}
      className={cn(
        transparent && !scrolled
          ? "text-white py-2"
          : "text-black py-2 bg-gray-22",
        "px-20 md:px-6 flex flex-wrap absolute items-center w-full z-30 justify-between"
      )}
    >
      <Link href="/">
        <a className="flex flex-shrink-0">
          {scrolled ? <PurposeLogoDark /> : <PurposeLogo />}
        </a>
      </Link>
      <NavbarLinkGroup scrolled={scrolled} transparent={transparent} />
    </nav>
  </React.Fragment>
)

export default Navbar
