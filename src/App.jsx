import { useEffect } from 'react'
import Header from './components/quiz/Header'
import Main from './components/quiz/Main'
import { useReducer } from 'react'
import axios from 'axios'

const api = import.meta.env.VITE_API_URL
const initialState = {
  questions: [],
  //? User can be in loading or error or ready or active or finished state.
  status: 'loading'
}

const quesReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_RECIEVED':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'DATA_FAILED':
      return { ...state, status: 'error' }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(quesReducer, initialState)
  const { questions, status } = state

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        let { data } = await axios.get(`${api}questions`)
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
      </Main>
    </div>
  )
}
