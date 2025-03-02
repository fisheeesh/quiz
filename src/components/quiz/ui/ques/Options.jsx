import { useDispatch, useSelector } from "react-redux"
import { newAnswer } from "../../../../features/ques/quesSlice"

/* eslint-disable react/prop-types */
export default function Options({ question }) {
    const { answer } = useSelector(store => store.question)
    const dispatch = useDispatch()

    //? To keep track user selected an answer or not
    const hasAnswered = answer !== null

    return (
        <div className="options">
            {
                question.options.map((opt, index) => (
                    <button
                        disabled={hasAnswered}
                        key={index}
                        onClick={() => dispatch(newAnswer(index))}
                        className={`btn btn-option ${answer === index ? 'answer' : ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`} >
                        {opt}
                    </button>
                ))
            }
        </div >
    )
}
