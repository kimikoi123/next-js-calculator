import Calculator from "@/sections/Calculator"
import CalculatorContextProvider from "@/contexts/CalculatorContext"

export default function Home() {
  return (
    <CalculatorContextProvider>
      <div className="bg-black h-screen overflow-hidden text-white grid place-items-center">
        <Calculator />
      </div>
    </CalculatorContextProvider>
  )
}
