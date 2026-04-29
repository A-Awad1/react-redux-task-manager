import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasks";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

let lastSaved = null;

store.subscribe(() => {
  try {
    const current = JSON.stringify(store.getState().tasks.items || []);
    if (current !== lastSaved) {
      localStorage.setItem("tasks", current);
      lastSaved = current;
    }
  } catch (e) {
    console.log(e);
  }
});
