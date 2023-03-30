const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

export function formatOperand(operand: string) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(parseInt(integer))
  return `${INTEGER_FORMATTER.format(parseInt(integer))}.${decimal}`
}
