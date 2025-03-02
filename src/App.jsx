import { useDispatch, useSelector } from 'react-redux'
import Header from './components/quiz/ui/Header.jsx'
import Main from './components/quiz/ui/Main.jsx'
import Loader from './components/quiz/status/Loader.jsx'
import Error from './components/quiz/status/Error.jsx'
import StartScreen from './components/quiz/ui/StartScreen.jsx'
import Question from './components/quiz/ui/ques/Question.jsx'
import NextButton from './components/quiz/ui/ques/NextButton.jsx'
import FinishedScreen from './components/quiz/ui/FinishedScreen.jsx'
import Progress from './components/quiz/ui/ques/Progress.jsx'
import Footer from './components/quiz/ui/Footer.jsx'
import Timer from './components/quiz/ui/ques/Timer.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { error, loaded } from './features/ques/quesSlice'

const api = 'http://localhost:3000'

export default function App() {
  const { status, answer } = useSelector(store => store.question)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const { data } = await axios.get(`${api}/questions`)
        dispatch(loaded(data))
      }
      catch (err) {
        console.log('Error Fetcing: ', err.message)
        dispatch(error())
      }
    }

    fetchQuestions()
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' &&
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              {answer !== null && <NextButton />}
            </Footer>
          </>}
        {status === 'finished' && <FinishedScreen />}
      </Main>
    </div>
  )
}
