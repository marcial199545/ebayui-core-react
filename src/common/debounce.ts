// NOTE: typing based on https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
type AnyFunctionWithArgs = (...argument: any) => any

export function debounce<Fn extends AnyFunctionWithArgs>(
    fn: Fn,
    ms: number
): ((...args: Parameters<Fn>) => void) {
    let timer: NodeJS.Timeout | null

    return (...args: Parameters<Fn>) => {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            timer = null
            fn(...args)
        }, ms)
    }
}
