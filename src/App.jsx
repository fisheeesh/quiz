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
// import axios from 'axios'
import { error, loaded } from './features/ques/quesSlice'

// const api = 'http://localhost:3000'
const questions = [
  {
    "question": "Which is the most popular JavaScript framework?",
    "options": [
      "Angular",
      "React",
      "Svelte",
      "Vue"
    ],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "Which company invented React?",
    "options": [
      "Google",
      "Apple",
      "Netflix",
      "Facebook"
    ],
    "correctOption": 3,
    "points": 10
  },
  {
    "question": "What's the fundamental building block of React apps?",
    "options": [
      "Components",
      "Blocks",
      "Elements",
      "Effects"
    ],
    "correctOption": 0,
    "points": 10
  },
  {
    "question": "What's the name of the syntax we use to describe the UI in React components?",
    "options": [
      "FBJ",
      "Babel",
      "JSX",
      "ES2015"
    ],
    "correctOption": 2,
    "points": 10
  },
  {
    "question": "How does data flow naturally in React apps?",
    "options": [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides"
    ],
    "correctOption": 0,
    "points": 10
  },
  {
    "question": "How to pass data into a child component?",
    "options": [
      "State",
      "Props",
      "PropTypes",
      "Parameters"
    ],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "When to use derived state?",
    "options": [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable"
    ],
    "correctOption": 3,
    "points": 30
  },
  {
    "question": "What triggers a UI re-render in React?",
    "options": [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements"
    ],
    "correctOption": 2,
    "points": 20
  },
  {
    "question": "When do we directly \"touch\" the DOM in React?",
    "options": [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never"
    ],
    "correctOption": 3,
    "points": 20
  },
  {
    "question": "In what situation do we use a callback to update state?",
    "options": [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state"
    ],
    "correctOption": 3,
    "points": 30
  },
  {
    "question": "If we pass a function to useState, when will that function be called?",
    "options": [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state"
    ],
    "correctOption": 2,
    "points": 30
  },
  {
    "question": "Which hook to use for an API request on the component's initial render?",
    "options": [
      "useState",
      "useEffect",
      "useRef",
      "useReducer"
    ],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "Which variables should go into the useEffect dependency array?",
    "options": [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up"
    ],
    "correctOption": 2,
    "points": 30
  },
  {
    "question": "An effect will always run on the initial render.",
    "options": [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect"
    ],
    "correctOption": 0,
    "points": 30
  },
  {
    "question": "When will an effect run if it doesn't have a dependency array?",
    "options": [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered"
    ],
    "correctOption": 3,
    "points": 20
  }
]

export default function App() {
  const { status, answer } = useSelector(store => store.question)
  const dispatch = useDispatch()

  //? With json-server
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       await new Promise(resolve => setTimeout(resolve, 1000))
  //       const { data } = await axios.get(`${api}/questions`)
  //       dispatch(loaded(data))
  //     }
  //     catch (err) {
  //       console.log('Error Fetcing: ', err.message)
  //       dispatch(error())
  //     }
  //   }

  //   fetchQuestions()
  // }, [dispatch])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        dispatch(loaded(questions))
      }
      catch (err) {
        dispatch(error())
        console.log('Error Fetcing: ', err.message)
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
