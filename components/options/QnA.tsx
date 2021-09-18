import * as React from "react"
/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import LocaleContext from "../shared/context/localeContext"

import { WidthWrapper } from "./IncomeStrategies"
import fixture from "./QnA/fixture"

export default () => {
  const locale: any = React.useContext(LocaleContext)
  const title =
    locale.language === "en-CA"
      ? " Q&A with the fund manager"
      : "Questions et réponses avec le gestionnaire de fonds"

  return (
    <WidthWrapper css={css``} className="text-black-0">
      <h1 id="QNA" className="text-black-0 text-center leading-tight">
        {title}
      </h1>
      <div
        className="text-black-0 text-xs my-6"
        dangerouslySetInnerHTML={{
          __html: fixture.get(locale.language).note,
        }}
      />

      <div>
        {fixture.get(locale.language).QnAs.map((qna: any) => (
          <div
            className="my-4"
            key={qna.question}
            css={css`
              border-top: 1px solid rgba(0, 0, 0, 0.1);
            `}
          >
            <div className="my-4 mb-6 text-base text-black-0 bt">
              {qna.question}
            </div>
            <div dangerouslySetInnerHTML={{ __html: qna.answer }}></div>
          </div>
        ))}
      </div>
    </WidthWrapper>
  )
}
