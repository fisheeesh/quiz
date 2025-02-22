import useApp from "../../hooks/useApp"

export default function StartScreen() {
    const { numQuestions, dispatch } = useApp()
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} Questions to test your React Mastery</h3>
            <button type="button" onClick={() => dispatch({ type: 'ACTIVE' })} className="btn btn-ui">Let's start</button>
        </div>
    )
}
