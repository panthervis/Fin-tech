/** @jsx jsx */ jsx
import { jsx } from "@emotion/core"
import * as React from "react"

import Downshift from "downshift"
import { Manager, Popper, Reference } from "react-popper"
import cn from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import DropdownArrowDown from "./collapsibleItem/dropdownArrowDown.svg"
import DropdownArrowDark from "./collapsibleItem/dropdown-dark.svg"

interface OptionsProps {
  highlightedIndex: number | null
  inputValue: any
  getMenuProps: any
  getItemProps: any
  className?: any
  options: [any]
}

interface Options2Props {
  inputValue: any
  getMenuProps: any
  getItemProps?: any
  className?: any
  currentCategory?: any
  options: [any]
  categories: [any]
  highlightedIndex: number | null
}

const Options: React.FunctionComponent<OptionsProps> = ({
  className,
  highlightedIndex,
  getMenuProps,
  getItemProps,
  options,
}) => {
  return options.length ? (
    <ul
      className={cn(
        className,
        "border border-gray-1 bg-white rounded-b shadow text-gray-4"
      )}
      {...getMenuProps()}
    >
      {options.map((page: any, index: any) => (
        <Link key={page.value} href={`/${page.value}`}>
          <li
            key={index}
            {...getItemProps({
              index,
              item: page.value,
              className:
                highlightedIndex === index
                  ? "bg-gray-1 p-3 cursor-pointer"
                  : "bg-white p-3 cursor-pointer",
            })}
          >
            {page.option}
          </li>
        </Link>
      ))}
    </ul>
  ) : null
}

const OtherOptions: React.FunctionComponent<Options2Props> = ({
  className,
  getMenuProps,
  options,
  categories,
  highlightedIndex,
  getItemProps,
}) => {
  return options.length ? (
    <ul
      className={cn(
        className,
        "border border-gray-1 bg-white rounded-b shadow"
      )}
      css={{
        color: "#3D4A49",
        fontSize: "18px",
      }}
      {...getMenuProps()}
    >
      {options.map((option: any, index: any) => (
        <li
          key={index}
          {...getItemProps({
            index,
            item: option.value,
            className:
              highlightedIndex === index
                ? "bg-gray-1 p-3 cursor-pointer font-bold"
                : "bg-white p-3 cursor-pointer font-bold",
          })}
        >
          {option.option}{" "}
          {categories[option.option] && `(${categories[option.option]})`}
        </li>
      ))}
    </ul>
  ) : null
}

interface DropdownOptions {
  [key: string]: any
}

const Dropdown = ({
  initialSelectedItem = null,
  className = "",
  ...props
}: DropdownOptions) => {
  const router = useRouter()

  return (
    <Downshift
      onChange={props.onChange}
      initialSelectedItem={initialSelectedItem}
    >
      {({
        getToggleButtonProps,
        getItemProps,
        getInputProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
      }) => {
        const toggleButtonProps = getToggleButtonProps({
          ...props,
          className: "appearance-none text-left " + className,
        })
        const selectedOption = props.options.find(
          (option: { value: string | number; option: string | number }) =>
            option.value === getInputProps().value
        )
        return (
          <div>
            <Manager>
              <Reference>
                {({ ref: popperTargetRef }) => {
                  let dropdownPlaceholder = router.pathname.substr(1)
                  if (Number.isInteger(initialSelectedItem)) {
                    dropdownPlaceholder =
                      props.options[initialSelectedItem].option
                  }
                  return (
                    <div ref={popperTargetRef}>
                      <div
                        as="button"
                        {...toggleButtonProps}
                        className={
                          "flex justify-between appearance-none block antialiased text-lg border border-gray-1 rounded w-full p-3 font-bold text-gray-3 leading-tight focus:outline-none focus:shadow"
                        }
                      >
                        {selectedOption && "option" in selectedOption ? (
                          selectedOption.option
                        ) : (
                          <span className="text-white">
                            {dropdownPlaceholder.charAt(0).toLocaleUpperCase() +
                              dropdownPlaceholder.slice(1)}
                          </span>
                        )}
                        {props.categories ? (
                          <DropdownArrowDark />
                        ) : (
                          <DropdownArrowDown />
                        )}
                      </div>
                    </div>
                  )
                }}
              </Reference>
              {isOpen && (
                <Popper
                  placement="bottom"
                  modifiers={{
                    setWidth: {
                      enabled: true,
                      order: 840,
                      fn(data: any): any {
                        //@ts-ignore
                        data.offsets.popper.right = data.offsets.reference.right
                        data.offsets.popper.left =
                          data.offsets.reference.left + 1
                        const width = Math.round(data.offsets.reference.width)
                        data.offsets.popper.width = width
                        data.styles.width = width.toString() + "px"
                        return data
                      },
                    },
                  }}
                >
                  {({ ref, style, placement }) => (
                    <div
                      className="z-10"
                      ref={ref}
                      style={{
                        ...style,
                        marginTop: "-2px",
                      }}
                      data-placement={placement}
                    >
                      {props.categories ? (
                        <OtherOptions
                          getMenuProps={getMenuProps}
                          options={props.options}
                          inputValue={inputValue}
                          categories={props.categories}
                          highlightedIndex={highlightedIndex}
                          getItemProps={getItemProps}
                        />
                      ) : (
                        <Options
                          options={props.options}
                          highlightedIndex={highlightedIndex}
                          inputValue={inputValue}
                          getMenuProps={getMenuProps}
                          getItemProps={getItemProps}
                        />
                      )}
                    </div>
                  )}
                </Popper>
              )}
            </Manager>
          </div>
        )
      }}
    </Downshift>
  )
}
export default Dropdown
