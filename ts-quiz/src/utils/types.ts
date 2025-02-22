/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactNode } from "react";

export interface Question {
    question: string
    options: string[],
    correctOption: number,
    points: number
}

export interface QuesState {
    questions: Question[],
    status: 'loading' | 'error' | 'ready' | 'active' | 'finished' | 'restart',
    quesIndex: number,
    answer: number | null,
    points: number,
    highScore: number,
    secondsRemaining: number
}

export interface AppContextProviderProps {
    children: ReactNode;
}

export interface AppAction {
    type: 'DATA_RECIEVED' | 'ERROR' | 'NEW_ANSWER' | 'RESTART' | 'FINISHED' | 'ACTIVE' | "NEXT_QUESTION" | "TICK",
    payload?: any
}

export interface AppContextType {
    state: QuesState;
    dispatch: Dispatch<AppAction>;
    numQuestions: number,
    maxPossiblePoints: number
}


