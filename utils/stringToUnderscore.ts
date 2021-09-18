import lowerCase from "lodash/lowerCase"

const stringToUnderscore = (title: string) => {
  return lowerCase(title)
    .split(" ")
    .join("_")
}

export default stringToUnderscore
