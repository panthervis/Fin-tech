export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const capitalizeFirstLetters = (string: string) => {
  return string
    .split(" ")
    .map(value => {
      return capitalizeFirstLetter(value)
    })
    .join(" ")
}

const underscoreToCapitalize = (string: string) => {
  return string
    .split("_")
    .map(value => {
      return capitalizeFirstLetter(value)
    })
    .join(" ")
}

export default underscoreToCapitalize
