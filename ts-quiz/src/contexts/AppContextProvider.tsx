/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from "react";
import { AppAction, AppContextProviderProps, AppContextType, QuesState } from "../utils/types";
import { api } from "../utils/api";

const SEC_PER_QUES = 30
const initialState: QuesState = {
    questions: [],
    status: 'loading',
    quesIndex: 0,
    answer: null,
    points: 0,
    highScore: Number(localStorage.getItem('highScore')) || 0,
    secondsRemaining: 0
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const quesReducer = (state: QuesState, action: AppAction): QuesState => {
    switch (action.type) {
        case "DATA_RECIEVED":
            return { ...state, status: 'ready', questions: action.payload }
        case 'ERROR':
            return { ...state, status: 'error' }
        case 'ACTIVE':
            return { ...state, status: 'active', secondsRemaining: SEC_PER_QUES * state.questions.length }
        case 'NEW_ANSWER':
            {
                const isCorrect = state.questions[state.quesIndex].correctOption === action.payload
                return { ...state, answer: action.payload, points: isCorrect ? state.points + state.questions[state.quesIndex].points : state.points }
            }
        case "NEXT_QUESTION":
            return { ...state, quesIndex: state.quesIndex + 1, answer: null }
        case "FINISHED":
            {
                const newHighScore = state.points > state.highScore ? state.points : state.highScore
                localStorage.setItem('highScore', JSON.stringify(newHighScore))
                return { ...state, status: 'finished', highScore: newHighScore }
            }
        case "RESTART":
            return { ...initialState, questions: state.questions, status: 'ready', highScore: state.highScore }
        case "TICK":
            {
                const newHighScore = state.points > state.highScore ? state.points : state.highScore
                localStorage.setItem('highScore', JSON.stringify(newHighScore))
                return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? 'finished' : state.status, highScore: newHighScore }
            }
        default:
            return state;
    }
};

export default function AppContextProvider({ children }: AppContextProviderProps) {
    const [state, dispatch] = useReducer(quesReducer, initialState);

    const numQuestions = state.questions.length
    const maxPossiblePoints = state.questions.reduce((total, ques) => total + ques.points, 0)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500))
                const { data } = await api.get('/questions')
                if (!data) throw new Error('Failed to fetch questions.')
                dispatch({ type: 'DATA_RECIEVED', payload: data })
            }
            catch (err: unknown) {
                console.log('Error: ', err)
                dispatch({ type: 'ERROR' })
            }
        }

        fetchQuestions();
    }, [])

    return (
        <AppContext.Provider value={{ state, dispatch, numQuestions, maxPossiblePoints }}>
            {children}
        </AppContext.Provider>
    );
}