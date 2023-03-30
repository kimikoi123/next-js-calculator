"use client"

import { calcKeys } from "@/constants/data"
import Icon from "@mdi/react"
import { mdiHistory } from "@mdi/js"
import { useCalculatorContext } from "@/contexts/CalculatorContext"
import { useReducer } from "react"
import { formatOperand } from "@/utils/formatOperand"
import { convertCalculation } from "@/utils/convertCalculation"

interface ReducerAction {
  type: string
  payload: string
}

interface StateProps {
  previousOperand: string
  currentOperand: string
  operation: string
  overwrite?: boolean
}

const ACTION = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  TOGGLE_NEGATIVE: "toggle-negative",
  SHOW_HISTORY: "show-history",
}

const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/
const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\S+)\s*(?<operation>[\/\*])\s*(?<operand2>\S+)/
const EXPONENT_REGEX = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/
const ADD_SUBTRACT_REGEX =
  /(?<operand1>\S+)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\S+)/

export default function CalcMainScreen() {
  const { showHistory, handleShowHistory, handleSaveHistoryData } =
    useCalculatorContext()

  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer<
    (state: StateProps, { type, payload }: ReducerAction) => any
  >(reducer, { previousOperand: null, currentOperand: "0", operation: null })

  function parseEquation(equation: any): any {
    if (equation.match(PARENTHESIS_REGEX)) {
      const subEquation = equation.match(PARENTHESIS_REGEX).groups.equation
      const result = parseEquation(subEquation)
      const newEquation = equation.replace(PARENTHESIS_REGEX, result)
      return parseEquation(newEquation)
    } else if (equation.match(EXPONENT_REGEX)) {
      const result = handleMath(equation.match(EXPONENT_REGEX).groups)
      const newEquation = equation.replace(EXPONENT_REGEX, result)
      return parseEquation(newEquation)
    } else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
      const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
      const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
      return parseEquation(newEquation)
    } else if (equation.match(ADD_SUBTRACT_REGEX)) {
      const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
      const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
      return parseEquation(newEquation)
    } else {
      return parseFloat(equation)
    }
  }

  function handleMath({
    operand1,
    operand2,
    operation,
  }: {
    operand1: string
    operand2: string
    operation: string
  }) {
    const number1 = parseFloat(operand1)
    const number2 = parseFloat(operand2)

    switch (operation) {
      case "*":
        return number1 * number2
      case "/":
        return number1 / number2
      case "+":
        return number1 + number2
      case "-":
        return number1 - number2
      case "%":
        return number1 % number2
    }
  }

  function reducer(state: StateProps, { type, payload }: ReducerAction) {
    switch (type) {
      case ACTION.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload,
            overwrite: false,
          }
        }
        if (state.currentOperand === "0") {
          return {
            ...state,
            currentOperand: payload,
          }
        }
        if (payload === "." && state.currentOperand.includes(".")) return state
        return {
          ...state,
          currentOperand: `${state.currentOperand}${payload}`,
        }
      case ACTION.CHOOSE_OPERATION:
        if (
          state.previousOperand &&
          state.operation &&
          state.currentOperand !== "0"
        ) {
          return {
            previousOperand: `${state.previousOperand} ${state.operation} ${state.currentOperand}`,
            operation: payload,
            currentOperand: "0",
          }
        }
        if (state.currentOperand === "0" && state.operation) {
          return {
            ...state,
            operation: payload,
          }
        }
        return {
          ...state,
          previousOperand: `${state.currentOperand}`,
          operation: payload,
          currentOperand: "0",
        }
      case ACTION.EVALUATE:
        if (state.currentOperand && state.previousOperand && state.operation) {
          const sentence = `${state.previousOperand} ${state.operation} ${state.currentOperand}`
          const result = parseEquation(sentence)
          const calculation = `${sentence} = ${result}`
          handleSaveHistoryData(calculation)
          return {
            previousOperand: "",
            operation: "",
            overwrite: true,
            currentOperand: result.toString(),
          }
        }
        return state

      case ACTION.CLEAR:
        return {
          currentOperand: "0",
        }
      case ACTION.TOGGLE_NEGATIVE:
        if (state.currentOperand.includes("-") || state.currentOperand === "0")
          return {
            ...state,
            currentOperand: state.currentOperand.slice(1),
          }
        return {
          ...state,
          currentOperand: `-${state.currentOperand}`,
        }
    }
  }

  return (
    <div className={showHistory ? "hidden" : ""}>
      <div className="flex items-end flex-col pr-[24px] pl-[20px] py-5 break-all">
        <div className="text-[#5B5E67] text-[35px]">
          {convertCalculation(previousOperand)} {operation}
        </div>
        <div className={currentOperand.length > 6 ? 'text-[60px]' :'text-[89px]'}>{formatOperand(currentOperand)}</div>
      </div> 
      <div className="grid grid-cols-4 gap-0.5">
        {calcKeys.map((calc) => (
          <div
            key={calc.name}
            onClick={() => {
              if (calc.actionType === "show-history") {
                handleShowHistory()
              } else {
                dispatch({ type: calc.actionType, payload: calc.key })
              }
            }}
            className={`${
              calc.type === "function"
                ? "bg-[#5B5E67]"
                : calc.type === "operator"
                ? "bg-[#3764B4]"
                : "bg-[#3B3D43]"
            } w-[95px] h-[95px] rounded-[15px] text-[45px] grid place-items-center cursor-pointer`}
          >
            {calc.name === "history" ? (
              <Icon path={mdiHistory} size={2.4} />
            ) : (
              calc.key
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
