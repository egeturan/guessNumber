import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'counter',
  initialState: {
    upperBound: 10,
    lowerBound: 1,
    targetNumber: "",
    lastGuess: "",
    currentGuess: "",
    numberOfTrials: 0,
    userName: "Gauss",
    gameWin: 0,
    gamePlay: true,
  },
  reducers: {
    setUpperBound: (state, action) => {
      state.upperBound = action.payload;
    },
    setLowerBound: (state, action) => {
        state.lowerBound = action.payload;
    },
    setTargetNumber: (state, action) => {
      state.targetNumber = action.payload;
    },
    setLastGuess: (state, action) => {
      //console.log("Last Guess: " + action.payload)
      state.lastGuess = action.payload;
    },
    setCurrentGuess: (state, action) => {
      //console.log("Last Guess: " + action.payload)
      state.currentGuess = action.payload;
    },
    setNumberOfTrials: (state, action) => {
      state.numberOfTrials = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setGameWin: (state, action) => {
      state.gameWin = action.payload;
    },
    setGamePlay: (state, action) => {
      state.gamePlay = action.payload
    },
    reset: (state, action) => {
      state.lowerBound = 1;
      state.upperBound = 10;
    },
    resetGame: (state, action) =>
    {
      state.upperBound = 10;
      state.lowerBound = 1;
      state.targetNumber = "";
      state.lastGuess = "";
      state.currentGuess = "";
      state.numberOfTrials = 0;
    },
    resetGameAllSettings: (state, action) =>
    {
      state.upperBound = 10;
      state.lowerBound = 1;
      state.targetNumber = "";
      state.lastGuess = "";
      state.currentGuess = "";
      state.numberOfTrials = 0;
      state.gameWin = 0;
    },
  },
});

export const { setUpperBound, setLowerBound, setTargetNumber, setCurrentGuess, setLastGuess, setNumberOfTrials, setUserName, setGameWin, setGamePlay, resetGameAllSettings, reset, resetGame } = slice.actions;

export const assignUpperBoundAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(setUpperBound(amount));
  }, 1000);
};

export const assignLowerBoundAsync = amount => dispatch => {
    setTimeout(() => {
      dispatch(setLowerBound(amount));
    }, 1000);
  };


export const selectUpperBound = state => state.counter.upperBound;
export const selectLowerBound = state => state.counter.lowerBound;
export const selectTargetNumber = state => state.counter.targetNumber;
export const selectCurrentGuess = state => state.counter.currentGuess;
export const selectLastGuess = state => state.counter.lastGuess;
export const selectNumberOfTrials = state => state.counter.numberOfTrials;
export const selectGamePlay = state => state.counter.gamePlay;
export const selectUserName = state => state.counter.userName;
export const selectGameWin = state => state.counter.gameWin;

export default slice.reducer;
