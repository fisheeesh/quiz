/* eslint-disable react/prop-types */
export default function FinishedScreen({ points, maxPossiblePoints, highScore }) {
    const percentage = (points / maxPossiblePoints) * 100

    let emoji;
    if (percentage === 100) emoji = '🥇'
    else if (percentage >= 80 && percentage < 100) emoji = '🎉'
    else if (percentage >= 50 && percentage < 80) emoji = '😊'
    else if (percentage >= 0 && percentage < 50) emoji = '🤨'
    else emoji = '🤦‍♂️'

    return (
        <>
            <p className="result">
                {emoji} Your Scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(High Score: {highScore} points)</p>
        </>
    )
}
