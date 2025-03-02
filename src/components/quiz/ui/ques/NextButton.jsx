import { useDispatch, useSelector } from "react-redux"
import { finished, nextQues } from "../../../../features/ques/quesSlice"

export default function NextButton() {
    const { questions, index } = useSelector(store => store.question)
    const dispatch = useDispatch()

    const isLastQuestion = questions.length - 1 === index

    const onHandleClick = () => {
        if (isLastQuestion) dispatch(finished())
        else dispatch(nextQues())
    }

    return (
        <button
            onClick={onHandleClick}
            className='btn btn-ui'>
            {isLastQuestion ? 'Finish' : 'Next'}
        </button>
    )
}
