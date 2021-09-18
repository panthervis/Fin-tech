import cn from "classnames"

const TableCell: React.FunctionComponent<any> = ({ className, children }) => (
  <span className={cn("font-opensans text-2xs", className)}>{children}</span>
)

export default TableCell
