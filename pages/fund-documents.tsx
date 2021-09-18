/** @jsx jsx */
import * as React from "react"
import { jsx } from "@emotion/core"
import { NextPage, NextPageContext } from "next"
import Pagination from "react-paginate"
import Layout from "../components/shared/Layout"
import LegalPageHeader from "../components/shared/LegalPageHeader"
import useFundData from "../hooks/useFund"
import useTaxFormData from "../hooks/useTaxFormData"
import FundDocumentsTable from "../components/fundDocuments"
import "../components/shared/layout/styles/holdingPagination.css"
import { filterItems } from "../components/fundDocuments/helper"
import { parseCookies } from "../utils/parseCookies"
import LocaleContext from "../components/shared/context/localeContext"

const mergeData = (fundData: Array<any>, taxFormData: any) => {
  const newData = fundData.map((entry: any) => {
    return {
      ...entry,
      taxFormData:
        (taxFormData[entry.name] && taxFormData[entry.name]["2018"]) || "",
    }
  })
  return newData
}

const FundDocumentsContainer: React.FunctionComponent<any> = () => {
  const [paginatedData, setPaginatedData] = React.useState([] as any[])
  const [pageCount, setPageCount] = React.useState(1)
  const [searchTerm, setSearchTerm] = React.useState("")
  const { getFundData } = useFundData()
  const { getTaxFormData } = useTaxFormData()
  const initialData = getFundData()
  const taxFormData = getTaxFormData()
  const [pageSize, setPageSize] = React.useState(10)
  const [selected, setSelected] = React.useState(0)

  React.useEffect(() => {
    if (initialData && taxFormData) {
      const mergedData = mergeData(initialData, taxFormData)
      let filteredData = filterItems(mergedData, searchTerm)
      if (typeof filteredData.slice === "function") {
        setPaginatedData(
          filteredData.length > 0 ? filteredData.slice(0, pageSize) : []
        )
      }
      setPageCount(Math.ceil(filteredData.length / pageSize || 1))
    }
  }, [initialData, searchTerm, taxFormData])

  const handlePageSizeClick = (event: any) => {
    if (initialData && taxFormData) {
      const mergedData = mergeData(initialData, taxFormData)
      let pageSize = Number(event.target.value)
      setPageSize(pageSize)
      setPageCount(Math.ceil(mergedData.length / pageSize || 1))
      setPaginatedData(
        mergedData.slice(selected * pageSize, (selected + 1) * pageSize)
      )
    }
  }

  const handlePageClick = (data: any) => {
    if (initialData && taxFormData) {
      const mergedData = mergeData(initialData, taxFormData)
      let selected = data.selected
      setSelected(selected)
      setPaginatedData(
        mergedData.slice(selected * pageSize, (selected + 1) * pageSize)
      )
    }
  }

  const onHandleSearchTerm = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const locale: any = React.useContext(LocaleContext)
  const [header, setHeader] = React.useState()
  React.useEffect(() => {
    setHeader(
      locale.language === "fr-CA"
        ? "Documents relatifs aux fonds"
        : "Fund Documents"
    )
  }, [locale.language])
  return (
    <React.Fragment>
      <LegalPageHeader page="fund-documents" header={header} sublinks={false} />
      <div className="px-24 py-20">
        <div className="flex justify-between mb-6 items-center">
          <div>
            <label className="text-xs font-light">Show</label>
            <select
              className="border-solid text-xs"
              value={pageSize}
              onChange={handlePageSizeClick}
              css={{
                border: "1px solid rgba(136, 136, 136, 0.29)",
                borderRadius: "4px",
                background: "white",
                margin: "0 6px",
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <label className="text-xs font-light">entries</label>
          </div>
          <div>
            <input
              className=""
              placeholder="Search"
              value={searchTerm}
              onChange={onHandleSearchTerm}
              css={{
                border: "1px solid rgba(136, 136, 136, 0.29)",
                borderRadius: "4px",
                background: "white",
                margin: "0 6px",
                width: "134px",
                height: "45px",
                fontSize: "18px",
                backgroundImage:
                  "url('https://img.icons8.com/pastel-glyph/64/000000/search--v2.png')",
                paddingLeft: "50px",
                backgroundSize: "30px",
                backgroundPosition: "12px 50%",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
        <FundDocumentsTable funds={paginatedData} />
        <div className="flex justify-end">
          <Pagination
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            initialPage={1}
            previousClassName={"previous_btn"}
            nextClassName={"next_btn"}
            activeLinkClassName={"active_link"}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

type FundDocumentsProps = {}

const FundDocuments: NextPage<FundDocumentsProps> = () => {
  return (
    <Layout>
      <FundDocumentsContainer />
    </Layout>
  )
}

FundDocuments.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  return {
    initialLocale: cookie.locale,
  }
}

export default FundDocuments
