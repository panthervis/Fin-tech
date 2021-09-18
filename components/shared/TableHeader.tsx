import cn from "classnames"

const TableHeader: React.FunctionComponent<any> = ({ className, children }) => (
  <span
    className={cn(
      "uppercase font-opensans font-black text-4xs text-left",
      className
    )}
  >
    {children}
  </span>
)

export default TableHeader
