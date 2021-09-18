import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const GET_JOB_POSTINGS = gql`
  query getJobPostings {
    getJobPostings
      @rest(
        type: "[JobPosting]"
        path: "companies/PurposeFinancial/postings?custom_field.58b7e4d1e4b09a6d37a0cdac=905707b2-f1dd-4f52-bdc2-9380d0944996"
      ) {
      id
      department @type(name: "Department") {
        label
      }
      jobAd @type(name: "JobAd") {
        sections @type(name: "JobSections") {
          jobDescription @type(name: "JobDescription") {
            text
          }
        }
      }
      name
    }
  }
`

const GET_JOB_POSTING = gql`
  query getJobPosting($id: Int!) {
    getJobPosting(id: $id)
      @rest(
        type: "JobPosting"
        path: "companies/PurposeFinancial/postings/{args.id}"
      ) {
      id
      department @type(name: "Department") {
        label
      }
      jobAd @type(name: "JobAd") {
        sections @type(name: "JobSections") {
          jobDescription @type(name: "JobDescription") {
            text
          }
        }
      }
      postingUrl
      name
    }
  }
`

const useJobPosting = () => {
  const { data } = useQuery(GET_JOB_POSTINGS)

  const list = data && data.getJobPostings

  const get = (variables: { id: string }) => {
    const { data } = useQuery(GET_JOB_POSTING, { variables })
    return data && data.getJobPosting
  }

  return { list, get }
}

export default useJobPosting
