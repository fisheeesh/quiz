import { useSelector } from "react-redux"

export default function Progress() {
    const { questions, index, points, answer } = useSelector(store => store.question)
    const numQuestions = questions.length
    const maxPossiblePoints = questions.reduce((total, ques) => total + ques.points, 0)

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
