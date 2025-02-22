import useApp from "../../hooks/useApp"

export default function Progress() {
    const { state, numQuestions, maxPossiblePoints } = useApp()
    return (
        <div className="progress">
            <progress max={numQuestions} value={state.quesIndex + Number(state.answer !== null)}></progress>
            <p>Question: <strong>{state.quesIndex + 1}</strong> / {numQuestions}</p>
            <p>Points: <strong>{state.points}</strong> / {maxPossiblePoints}</p>
        </div>
    )
}
