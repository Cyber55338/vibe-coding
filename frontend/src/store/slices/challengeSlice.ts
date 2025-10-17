import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestCase {
  id: string;
  description: string;
  passed?: boolean;
  expectedOutput?: any;
  actualOutput?: any;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  testCases: TestCase[];
}

interface ChallengeState {
  current: Challenge | null;
  code: string;
  language: string;
  mode: 'block' | 'text' | 'hybrid';
  executing: boolean;
  results: {
    passed: number;
    failed: number;
    total: number;
    testResults: TestCase[];
  } | null;
  completed: boolean;
}

const initialState: ChallengeState = {
  current: null,
  code: '',
  language: 'javascript',
  mode: 'block',
  executing: false,
  results: null,
  completed: false,
};

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    loadChallenge: (state, action: PayloadAction<Challenge>) => {
      state.current = action.payload;
      state.code = '';
      state.results = null;
      state.completed = false;
    },
    updateCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    switchMode: (state, action: PayloadAction<'block' | 'text' | 'hybrid'>) => {
      state.mode = action.payload;
    },
    executeStart: (state) => {
      state.executing = true;
    },
    executeSuccess: (state, action: PayloadAction<ChallengeState['results']>) => {
      state.executing = false;
      state.results = action.payload;
      state.completed = action.payload ? action.payload.failed === 0 : false;
    },
    executeFailure: (state) => {
      state.executing = false;
    },
    resetChallenge: (state) => {
      state.code = '';
      state.results = null;
      state.completed = false;
    },
  },
});

export const {
  loadChallenge,
  updateCode,
  switchMode,
  executeStart,
  executeSuccess,
  executeFailure,
  resetChallenge,
} = challengeSlice.actions;

export default challengeSlice.reducer;
