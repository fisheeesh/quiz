import useApp from "../../hooks/useApp"
import Options from "./Options"

export default function Question() {
    const { state } = useApp()
    return (
        <div>
            <h4>{state.questions[state.quesIndex].question}</h4>
            <Options />
        </div>
    )
}
