import Error from "./components/status/Error";
import Loader from "./components/status/Loader";
import FinishedScreen from "./components/ui/FinishedScreen";
import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import Main from "./components/ui/Main";
import NextButton from "./components/ui/NextButton";
import Progress from "./components/ui/Progress";
import Question from "./components/ui/Question";
import StartScreen from "./components/ui/StartScreen";
import Timer from "./components/ui/Timer";
import useApp from "./hooks/useApp";

export default function App() {
  const { state } = useApp()

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === 'loading' && <Loader />}
        {state.status === 'error' && <Error />}
        {state.status === 'ready' && <StartScreen />}
        {state.status === 'active' &&
          <>
            <Progress />
            <Question />
            <Footer>
              {state.answer !== null && <NextButton />}
              <Timer />
            </Footer>
          </>
        }
        {
          state.status === 'finished' && <FinishedScreen />
        }
      </Main>
    </div>
  )
}
