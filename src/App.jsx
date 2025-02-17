import { useEffect } from 'react'
import Header from './components/quiz/ui/Header'
import Main from './components/quiz/ui/Main'
import Loader from './components/quiz/status/Loader'
import Error from './components/quiz/status/Error'
import { useReducer } from 'react'
import axios from 'axios'
import StartScreen from './components/quiz/ui/StartScreen'
import Question from './components/quiz/ui/Question'

const api = import.meta.env.VITE_API_URL
const initialState = {
  questions: [],
  //? User can be in loading | error | ready | active | finished state.
  status: 'loading'
}

const quesReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_RECIEVED':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'DATA_FAILED':
      return { ...state, status: 'error' }
    case 'ACTIVE':
      return { ...state, status: 'active' }
    default:
      return state
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(quesReducer, initialState)

  const numQuestions = questions.length

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        let { data } = await axios.get(`${api}/questions`)
        dispatch({ type: 'DATA_RECIEVED', payload: data })
      }
      catch (err) {
        console.error("Error fetching questions:", err)
        dispatch({ type: 'DATA_FAILED' })
      }
    }

    fetchQuestion()
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
        {status === 'active' && <Question />}
      </Main>
    </div>
  )
}
