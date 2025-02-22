import useApp from "../../hooks/useApp"

export default function FinishedScreen() {
    const { state, maxPossiblePoints, dispatch } = useApp()
    const percentage = (state.points / maxPossiblePoints) * 100
    
    return (
        <div>
            <p className="result">
                You scored <strong>{state.points}</strong> out of {maxPossiblePoints} points ({Math.floor(percentage)}%)
            </p>
            <p className="highscore">
                (HighScore: <strong>{state.highScore}</strong> points)
            </p>
            <button
                onClick={() => dispatch({ type: 'RESTART' })}
                type="button"
                className="btn btn-ui">
                Restart Quiz!
            </button>
        </div>
    )
}
