import { useSelector } from "react-redux"

export default function Progress() {
    const { maxPossiblePoints, numQuestions, index, points, answer } = useSelector(store => store.question)

    return (
        <div className='progress'>
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>
                Question: <strong>{index + 1}</strong> / {numQuestions}
            </p>
            <p>
                Points: <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </div>
    )
}
