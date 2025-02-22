import useApp from "../../hooks/useApp"

export default function Options() {
    const { state, dispatch } = useApp()

    const hasAnswered = state.answer !== null
    return (
        <div className="options">
            {
                state.questions[state.quesIndex].options.map((opt, index) => (
                    <button
                        disabled={hasAnswered}
                        onClick={() => dispatch({ type: 'NEW_ANSWER', payload: index })}
                        className={`${state.answer === index ? 'answer' : ''} ${hasAnswered ? index === state.questions[state.quesIndex].correctOption ? 'correct' : 'wrong' : ''} btn btn-option`}
                        key={index}>
                        {opt}
                    </button>
                ))
            }
        </div>
    )
}
