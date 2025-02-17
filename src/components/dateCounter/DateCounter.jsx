import { useReducer } from "react";

const initialState = { count: 0, step: 1 }

const countReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + action.payload }
        case "DECREMENT":
            return { ...state, count: state.count - action.payload }
        case "SET_COUNT":
            return { ...state, count: action.payload }
        case "SET_STEP":
            return { ...state, step: action.payload }
        case "RESET":
            return initialState
        default:
            return state
    }
}

function DateCounter() {
    const [state, dispatch] = useReducer(countReducer, initialState)
    const { count, step } = state

    // This mutates the date object.
    const date = new Date("feb 17 2025")
    date.setDate(date.getDate() + count);

    const inc = () => {
        dispatch({ type: "INCREMENT", payload: step })
    }

    const dec = () => {
        dispatch({ type: "DECREMENT", payload: step })
    }

    const setCount = (e) => {
        dispatch({ type: "SET_COUNT", payload: Number(e.target.value) })
    }

    const setStep = (e) => {
        dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
    }

    const reset = () => {
        dispatch({ type: "RESET" })
    }

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={e => setStep(e)}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={e => setCount(e)} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;