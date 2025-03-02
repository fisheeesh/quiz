import { useDispatch, useSelector } from "react-redux"
import { active } from "../../../features/ques/quesSlice"

export default function StartScreen() {
    const { questions } = useSelector(store => store.question)
    const dispatch = useDispatch()

    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{questions.length} questions to test your React mastery</h3>
            <button onClick={() => dispatch(active())} className="btn btn-ui">Let&apos;s Start</button>
        </div>
    )
}
