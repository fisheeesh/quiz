/* eslint-disable react/prop-types */
export default function Options({ questions, dispatch, answer }) {
    // ? To track if the user has already selected an answer or
    const hasAnswered = answer !== null
    return (
        <div className="options">
            {
                questions.options.map((opt, index) => (
                    <button
                        disabled={hasAnswered}
                        onClick={() => dispatch({ type: 'NEW_ANSWER', payload: index })}
                        className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? index === questions.correctOption ? 'correct' : 'wrong' : ''}`}
                        key={index}>
                        {opt}
                    </button>
                ))
            }
        </div>
    )
}
