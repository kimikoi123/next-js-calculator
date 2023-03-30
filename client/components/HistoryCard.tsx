import { formatOperand } from "@/utils/formatOperand"
import { convertCalculation } from "@/utils/convertCalculation"

interface HistoryCardProps {
  value: string
}

export default function HistoryCard({ value }: HistoryCardProps) {
  const [calculation, result] = value.split("=")

  return (
    <div className="bg-[#5B5E67] p-4 first:rounded-t-[15px] last:rounded-b-[15px]">
      <div>{convertCalculation(calculation)}</div>
      <div>= {formatOperand(result)}</div>
    </div>
  )
}
