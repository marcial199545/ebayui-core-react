import { useEffect, useState, Dispatch, SetStateAction } from 'react'

const useKeyPress = (): [boolean, boolean] => {
    const [arrowUpPressed, setArrowUpPressed] = useState(false)
    const [arrowDownPressed, setArrowDownPressed] = useState(false)

    const upHandler = ({ key }: KeyboardEvent) => {
        const keyMap: Record<string, Dispatch<SetStateAction<boolean>>> = {
            ArrowUp: setArrowUpPressed,
            ArrowDown: setArrowDownPressed
        }
        const fn = keyMap[key]

        if (fn) fn(false)
    }

    const downHandler = ({ key }: KeyboardEvent) => {
        const keyMap: Record<string, Dispatch<SetStateAction<boolean>>> = {
            ArrowUp: setArrowUpPressed,
            ArrowDown: setArrowDownPressed
        }
        const fn = keyMap[key]

        if (fn) fn(true)
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    return [arrowUpPressed, arrowDownPressed]
}

export default useKeyPress
