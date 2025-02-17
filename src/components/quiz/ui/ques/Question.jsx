import Options from "./Options"

/* eslint-disable react/prop-types */
export default function Question({ question, dispatch, answer }) {
    console.log(question)
    return (
        <div>
            <h4>{question.question}</h4>
            <Options questions={question} dispatch={dispatch} answer={answer} />
        </div>
    )
}
