import { useSelector } from "react-redux"
import Options from "./Options"

export default function Question() {
    const { questions, index } = useSelector(store => store.question)
    const question = questions.at(index)

    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} />
        </div>
    )
}
