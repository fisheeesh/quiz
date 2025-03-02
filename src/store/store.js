import { configureStore } from "@reduxjs/toolkit";
import quesReducer from '../features/ques/quesSlice'

const store = configureStore({
    reducer: {
        question: quesReducer
    }
})

export default store