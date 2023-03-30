"use-client"

import HistoryContent from "./HistoryContent"
import HistoryEmpty from "./HistoryEmpty"
import { useCalculatorContext } from "@/contexts/CalculatorContext"
import Icon from "@mdi/react"
import { mdiArrowLeft } from "@mdi/js"

export default function CalcHistory() {
  const { handleDeleteHistory, showHistory, historyData, handleBackToMenu } =
    useCalculatorContext()

  return (
    <div className={`${showHistory === false ? "hidden" : ""} p-5`}>
      <div className="text-center grid grid-cols-3 items-center">
        <div
          onClick={() => {
            handleBackToMenu()
          }}
        >
          <Icon className="cursor-pointer" path={mdiArrowLeft} size={1.2} />
        </div>
        <div className="text-[23px]">History</div>
        <div
          className="flex justify-end pr-4 cursor-pointer"
          onClick={() => {
            handleDeleteHistory()
          }}
        >
          <img
            className={historyData.length == 0 ? "hidden" : ""}
            src="/remove.svg"
          />
        </div>
      </div>
      <HistoryContent />
      {historyData.length === 0 && <HistoryEmpty />}
    </div>
  )
}
