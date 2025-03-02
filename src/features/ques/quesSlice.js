import { createSlice } from "@reduxjs/toolkit";

const SEC_PER_QUES = 5;

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: null,
    secondRemaining: null
};

const quesSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        loaded(state, action) {
            state.questions = action.payload;
            state.status = "ready";
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
            state.highScore = Math.max(state.highScore ?? 0, state.points);
        },
        restart(state) {
            return {
                ...initialState,
                highScore: state.highScore, 
                questions: state.questions,
                status: "ready"
            };
        },
        tick(state) {
            if (state.secondRemaining > 0) {
                state.secondRemaining -= 1;
            }
            if (state.secondRemaining === 0) {
                state.status = "finished";
                state.highScore = Math.max(state.highScore ?? 0, state.points);
            }
        }
    }
});

export const { loaded, error, active, newAnswer, nextQues, finished, restart, tick } = quesSlice.actions;

export default quesSlice.reducer;