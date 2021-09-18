export const formatOptions = (array: string[]) => {
  return array.map((item, index) => {
    return {
      value: `${index}`,
      option: item
    }
  })
}

export const moveItem = (array: string[], from: number, to: number) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
}