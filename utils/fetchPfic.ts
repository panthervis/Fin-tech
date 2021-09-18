import fetch from "isomorphic-unfetch"

export const fetchEntriesForPfic = async () => {
  const data = await fetch(`https://purposecloud.s3.amazonaws.com/pfic.json`)
  const json = data.json()
  return json
}
