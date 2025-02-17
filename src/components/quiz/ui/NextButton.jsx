/* eslint-disable react/prop-types */
export default function NextButton({ dispatch, answer }) {
    if (answer === null) return
    return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
            Next
        </button>
    )
}
