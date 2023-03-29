import React from 'react'
import HistoryContent from './HistoryContent'
import HistoryEmpty from './HistoryEmpty'

interface CalcProps {
  setShowHistory: any
  showHistory: any
}



export default function CalcHistory({ showHistory, setShowHistory} : CalcProps) {
  return (
    <div className={`${showHistory === false ? 'hidden' : ''} p-5`}>
        <div className='text-center grid grid-cols-3 items-center'>
            <div></div>
            <div className='text-[23px]'>History</div>
            <div className='flex justify-end pr-4'><img className='' src='/remove.svg' /></div>
        </div>
        <HistoryContent />
        {/* <HistoryEmpty /> */}
    </div>
  )
}
