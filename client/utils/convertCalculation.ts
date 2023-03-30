import { formatOperand } from "./formatOperand";


export function convertCalculation(calculation: string) {
    const pattern = /[0-9]/
    if (calculation == null) return formatOperand(calculation)
    return calculation.split(' ').map(item => {
        if (pattern.test(item)) {
            return formatOperand(item)
        }
        return item
    }).join(' ')
}