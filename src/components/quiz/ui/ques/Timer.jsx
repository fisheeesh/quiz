import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { tick } from "../../../../features/ques/quesSlice"

export default function Timer() {
    const { secondRemaining } = useSelector(store => store.question)
    const dispatch = useDispatch()

    const mins = Math.floor(secondRemaining / 60)
    const secs = secondRemaining % 60

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(tick())
        }, 1000)

        return () => clearInterval(id)
    }, [dispatch])

    return (
        <div className="timer">
            {mins < 10 && ' 0'}{mins} : {secs < 10 && '0'}{secs}
        </div>
    )
}
