/* eslint-disable react/prop-types */
export default function NextButton({ dispatch, answer, index, numQuestions }) {
    const isLastQuestion = index === numQuestions - 1
    if (answer === null) return

    const handleNextQuestion = () => {
        if (isLastQuestion) dispatch({ type: 'FINISHED' })
        else dispatch({ type: 'NEXT_QUESTION' })
    }
    return (
        <button className="btn btn-ui" onClick={handleNextQuestion}>
            {isLastQuestion ? 'Finish' : 'Next'}
        </button>
    )
}
