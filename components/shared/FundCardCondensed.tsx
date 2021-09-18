/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { LocalEventAction } from "../../utils/eventEmitter"
import { useEventListener } from "../../utils/useEventEmitter"
// import { useEventListener } from "../../utils/useEventEmitter"

type FundWrapperProps = {
  fund: any
  children: React.ReactElement
}

const FundWrapper: React.FunctionComponent<FundWrapperProps> = ({
  fund,
  children,
}) => {
  return /^http/.test(fund.url_name) ? (
    <a href={fund.url_name}>{children}</a>
  ) : (
    <Link href={`/funds/${fund.url_name}`}>{children}</Link>
  )
}

type CardProps = {
  fund: any
  language?: any
}

const FundCardCondensed: React.FunctionComponent<CardProps> = ({ fund }) => {
  const [active, setActive] = React.useState(false)
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false)
  const handleEvent = (v: any) => {
    setActive(v === fund.url_name)
  }

  const handleSubmitEvent = (v: any) => {
    if (v === fund.url_name) {
      setIsSubmit(true)
    }
  }

  useEventListener(LocalEventAction.ACTIVE_SUGGEST_SEARCH, handleEvent)
  useEventListener(LocalEventAction.SUBMIT_SUGGEST_SEARCH, handleSubmitEvent)

  return (
    <FundWrapper fund={fund}>
      <div
        ref={ref => {
          if (!ref) return
          if (isSubmit) {
            setIsSubmit(false)
            ref.click()
          }
        }}
        className="px-3 py-3 mx-2 mb-3 mt-1 w-full relative shadow-blur rounded bg-white cursor-pointer"
        css={css`
          ${active ? "background: #f5f5f5;" : undefined}
        `}
      >
        <p className="font-opensans text-teal-1 text-sm">{fund.name}</p>

        <p className="font-opensans mt-1 text-gray-18 text-xs">
          <ReactMarkdown
            source={
              fund.contentfulFields && fund.contentfulFields.fundSubheader
            }
            disallowedTypes={["paragraph", "link"]}
            unwrapDisallowed={true}
          />
        </p>
      </div>
    </FundWrapper>
  )
}

export default FundCardCondensed
