/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import Select from "react-select"
import { GroupType } from "react-select/src/types"

type SelectProps = {
  title?: string
  options:
    | readonly {
        value: string
        label: string
      }[]
    | readonly GroupType<{
        value: string
        label: string
      }>[]
    | undefined
  setValue: any
  currentValue: {
    value: string
    label: string
  }
  border?: any
}

const FilterSelect: React.FunctionComponent<SelectProps> = ({
  title,
  options,
  setValue,
  currentValue,
  border,
}) => {
  return (
    <div
      className="flex flex-1 flex-col mt-3 md:mr-0 sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3"
      css={css`
        ${border};
        width: auto;
        @media (max-width: 420px) {
          width: 100%;
        }
      `}
    >
      <p
        className="font-tiempos italic text-sm leading-none whitespace-no-wrap"
        css={css`
          @media (max-width: 420px) {
            font-size: 18px;
          }
        `}
      >
        {title}
      </p>
      <Select
        defaultValue={options && (options[0] as any)}
        options={options}
        onChange={(selectedOption: any) => {
          setValue(selectedOption)
        }}
        isSearchable={false}
        value={currentValue}
        className="mt-1 text-white"
        maxMenuHeight={600}
        css={css`
          @media (max-width: 420px) {
            font-size: 24px;
          }
        `}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "rgb(200,200,200)",
            primary: "rgb(0,0,0)",
          },
        })}
        styles={{
          indicatorsContainer: () => {
            return {
              alignSelf: "self-start",
            }
          },
          control: () => ({
            backgroundColor: "transparent",
            display: "flex",
            marginRight: "1em",
          }),
          menu: provided => ({
            ...provided,
            height: "auto",
            maxWidth: "11.5em",
            fontSize: "0.75rem",
            backgroundColor: "rgba(0,0,0,0.9)",
            "@media(max-width: 420px)": {
              fontSize: "18px",
            },
          }),
          singleValue: () => ({
            color: "white",
            cursor: "pointer",
            maxWidth: "fit-content",
            wordWrap: "break-word",
            fontSize: "0.8rem",
            display: "inline",
          }),
          valueContainer: provided => ({
            ...provided,
            paddingLeft: "0",
            maxWidth: "fit-content",
            display: "table-cell",
            "@media(max-width: 640px)": {
              maxWidth: "100%",
            },
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          dropdownIndicator: () => ({
            opacity: 1,
            color: "white",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "0.5em",
            "@media(max-width: 640px)": {
              paddingTop: "0.6em",
            },
          }),
        }}
      />
    </div>
  )
}

export default FilterSelect
