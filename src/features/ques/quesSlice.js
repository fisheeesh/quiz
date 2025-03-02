import { createSlice } from "@reduxjs/toolkit";

const SEC_PER_QUES = 15;

const initialState = {
    questions: [],
    numQuestions: 0,
    maxPossiblePoints: 0,
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondRemaining: null
};

const quesSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        loaded(state, action) {
            state.questions = action.payload;
            state.status = "ready";
            state.numQuestions = state.questions.length;
            state.maxPossiblePoints = state.questions.reduce((acc, ques) => acc + ques.points, 0);
        },
        error(state) {
            state.status = "error";
        },
        active(state) {
            state.status = "active";
            state.secondRemaining = state.questions.length * SEC_PER_QUES;
        },
        newAnswer(state, action) {
            const currentQues = state.questions[state.index];
            state.answer = action.payload;
            if (action.payload === currentQues.correctOption) {
                state.points += currentQues.points;
            }
        },
        nextQues(state) {
            state.index += 1;
            state.answer = null;
        },
        finished(state) {
            state.status = "finished";
            state.highScore = Math.max(state.highScore, state.points);
        },
        restart(state) {
            return {
                ...initialState,
                highScore: state.highScore, 
                questions: state.questions,
                maxPossiblePoints: state.maxPossiblePoints,
                numQuestions: state.numQuestions,
                status: "ready"
            };
        },
        tick(state) {
            if (state.secondRemaining > 0) {
                state.secondRemaining -= 1;
            }
            if (state.secondRemaining === 0) {
                state.status = "finished";
                state.highScore = Math.max(state.highScore, state.points);
            }
        }
    }
});

export const { loaded, error, active, newAnswer, nextQues, finished, restart, tick } = quesSlice.actions;

export default quesSlice.reducer;