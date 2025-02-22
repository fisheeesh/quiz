import useApp from "../../hooks/useApp"

export default function NextButton() {
    const { state, dispatch, numQuestions } = useApp()

    const isLast = state.quesIndex === numQuestions - 1

    const handleClick = () => {
        if (isLast) dispatch({ type: 'FINISHED' })
        else dispatch({ type: 'NEXT_QUESTION' })
    }

    return (
        <button type="button" onClick={handleClick} className="btn btn-ui">
            {isLast ? 'Finish' : 'Next'}
        </button>
    )
}
