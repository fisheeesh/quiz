import { useEffect } from "react"
import useApp from "../../hooks/useApp"

export default function Timer() {
    const { state, dispatch } = useApp()

    const mins = Math.floor(state.secondsRemaining / 60)
    const secs = state.secondsRemaining % 60

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'TICK' })
        }, 1000)

        return () => {
            clearInterval(id)
        }
    }, [dispatch])

    return (
        <div className="timer">
            {mins < 10 && '0'}{mins}:{secs<10 && '0'}{secs}
        </div>
    )
}
