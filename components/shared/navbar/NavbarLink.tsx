import * as React from "react"
import Link from "next/link"
import cn from "classnames"
/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"

type NavbarLinkProps = {
  href: string
  active?: boolean
  className?: string
  scrolled?: boolean
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined
}

const NavbarLink: React.FunctionComponent<NavbarLinkProps> = ({
  children,
  href,
  active = false,
  className,
  onClick,
  scrolled,
}) => (
  <Link href={href}>
    <div
      className={cn("relative", className)}
      onClick={onClick}
      css={css`
        height: 1.125rem;
        transition: width 0.5s;
        a:after,
        a:before {
          transition: width 0.5s;
        }
        a:after {
          position: absolute;
          bottom: -9px;
          left: 0;
          right: 0;
          margin: auto;
          width: 0%;
          content: ".";
          color: transparent;
          background: ${scrolled ? "black" : "white"};
          height: 1px;
          z-index: 9;
          @media only screen and (max-width: 942px) {
            position: relative;
            display: none;
          }
        }
        a.active:after,
        a:hover:after {
          width: 80%;
        }
      `}
    >
      <a
        className={
          (active ? "active" : "") + " font-opensans font-bold cursor-pointer"
        }
        css={css`
          margin: 0.27rem 0.58rem;
        `}
      >
        {children}
      </a>
    </div>
  </Link>
)

export default NavbarLink
