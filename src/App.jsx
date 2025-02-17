import { useEffect } from 'react'
import Header from './components/quiz/ui/Header'
import Main from './components/quiz/ui/Main'
import Loader from './components/quiz/status/Loader'
import Error from './components/quiz/status/Error'
import { useReducer } from 'react'
import axios from 'axios'
import StartScreen from './components/quiz/ui/StartScreen'
import Question from './components/quiz/ui/ques/Question'
import NextButton from './components/quiz/ui/ques/NextButton'
import Progress from './components/quiz/ui/ques/Progress'
import FinishedScreen from './components/quiz/ui/FinishedScreen'

const api = import.meta.env.VITE_API_URL
const initialState = {
  questions: [],
  //? User can be in loading | error | ready | active | finished state.
  status: 'loading',
  /**
   * ? We need some way of keeping track which question is current one
   * ? The value starts at 0 cuz we will use this index to take a certian question obj out of questions array.
   * ? And so then in the future, at some point, if we want to display the next question, 
   * ? we can already imagine that we will do that by changing this index.
   * ? So then in the future, when we change that index from zero to one, that should display the next question.
   * $ So it should then re-render the screen.
   */
  index: 0,
  /**
   * ? To keep track of the answer that the user has selected.
   */
  answer: null,
  points: 0,
  highScore: 0
}

const quesReducer = (state, action) => {
  switch (action.type) {
    case 'DATA_RECIEVED':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'DATA_FAILED':
      return { ...state, status: 'error' }
    case 'ACTIVE':
      return { ...state, status: 'active' }
    case 'NEW_ANSWER':
      {
        /**
         * ? We only want to update user's points if only user has selected anwsers of the questions.
         * ? To keep track of that, first, we take the current question object out of questions array.
         * ? Then check user's selected answer and question's correct option are matched or not.
         * ? If so, we add the question's points to user's points.
         * ? If not, user's points will not be updated.
         */
        const question = state.questions.at(state.index)
        return {
          ...state,
          answer: action.payload,
          points: action.payload === question.correctOption ? state.points + question.points : state.points
        }
      }
    case "NEXT_QUESTION":
      return { ...state, index: state.index + 1, answer: null }
    case "FINISHED":
      /**
       * ? The best time to update user's high score is when user finishes the quizzes.
       * ? If user's points is greater than user's high score, then we update user's high score after everytime user finishes the quizzes.
       */
      return { ...state, status: 'finished', highScore: state.points > state.highScore ? state.points : state.highScore }
    default:
      return state
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] = useReducer(quesReducer, initialState)

  const numQuestions = questions.length

  const maxPossiblePoints = questions.reduce((total, ques) => total + ques.points, 0)

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
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
        {
          status === 'active' &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
          </>
        }
        {status === 'finished' && <FinishedScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} />}
      </Main>
    </div>
  )
}
