'use client'


import HistoryCard from "./HistoryCard"
import HistoryEmpty from "./HistoryEmpty"
import { useCalculatorContext } from "@/contexts/CalculatorContext"




export default function HistoryContent() {

  const { historyData } = useCalculatorContext() 
  return (
    <div className={`${historyData.length > 8 ? 'h-[700px]' : ''} grid gap-0.5 mt-4 overflow-x-hidden`}>
      {historyData.map(item => (
        <HistoryCard key={item.calculation} value={item.calculation} />
      ))}
    </div>
  )
}
