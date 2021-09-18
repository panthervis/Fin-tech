/** @jsx jsx */ jsx
import * as React from "react"
import { css, jsx } from "@emotion/core"

type Fund = {
  name: string
  code: string
  series: string
  structure: string
}

type Props = {
  funds: Fund[]
}

const TerminatedFundsTable: React.FunctionComponent<Props> = ({
  funds,
}: Props) => {
  return (
    <table className="table-fixed font-opensans w-full">
      <thead
        className="font-black"
        css={{ fontSize: "12px", letterSpacing: "2px", lineHeight: "15px" }}
      >
        <tr className="text-left">
          <th className="py-3 w-48">FUND</th>
          <th className="py-3 w-12">FUND CODE</th>
          <th className="py-3 w-12">SERIES</th>
          <th className="py-3 w-12">FUND STRUCTURE</th>
        </tr>
      </thead>
      <tbody>
        {funds.map((item: any, index: number) => (
          <tr
            key={`tfund_${index}`}
            css={css`
              border-bottom: 1px solid #dcdcd5;
            `}
          >
            <td
              className="py-1 font-light"
              css={{ fontSize: "16px", lineHeight: "20px" }}
            >
              {item.name}
            </td>
            <td
              className="py-1 font-bold"
              css={{ fontSize: "15px", lineHeight: "19px" }}
            >
              {item.code}
            </td>
            <td
              className="py-1 font-bold"
              css={{ fontSize: "15px", lineHeight: "19px" }}
            >
              {Object.keys(item.series).join(" ")}
            </td>
            <td
              className="py-1 font-bold"
              css={{ fontSize: "15px", lineHeight: "19px" }}
            >
              {item.structure}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TerminatedFundsTable
