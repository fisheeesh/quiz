/* eslint-disable react/prop-types */
import { useEffect } from "react"

export default function Timer({ dispatch, secondRemaining }) {
    const mins = Math.floor(secondRemaining / 60)
    const secs = secondRemaining % 60

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'TICK' })
        }, 1000)

        return () => clearInterval(id)
    }, [dispatch])
    return (
        <div className="timer">
            {mins < 10 && '0'}{mins}:{secs < 10 && '0'}{secs}
        </div>
    )
}
