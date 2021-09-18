import { ApolloProvider } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { RestLink } from "apollo-link-rest"
import fetch from "isomorphic-fetch"
import React, { ReactElement } from "react"

async function responseTransformer(res: any) {
  try {
    const data = await res.json()
    return data.content ? data.content : data
  } catch (e) {
    return undefined
  }
}

const typeDefs = gql`
  type Department {
    id: String
    label: String
  }
  type JobDescription {
    text: String
  }
  type JobSections {
    jobDescription: JobDescription
  }
  type JobAd {
    sections: JobSections
  }
  type JobPosting {
    name: String
    id: String
    department: Department
    postingUrl: String
    jobAd: JobAd
  }
`

interface IProps {
  children: ReactElement
}

if ((global as any).Headers == null) {
  ;(global as any).Headers = require("fetch-headers")
}

const restLink = new RestLink({
  customFetch: fetch,
  uri: "https://api.smartrecruiters.com/v1/",
  responseTransformer,
})
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  typeDefs,
})

const SRApolloProvider = ({ children }: IProps) => {
  return (
    <ApolloProvider client={client}>
      {React.cloneElement(children)}
    </ApolloProvider>
  )
}

export default SRApolloProvider
