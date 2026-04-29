import { createSlice } from "@reduxjs/toolkit";

const loadTasks = () => {
  try {
    const raw = localStorage.getItem("tasks");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const initialState = {
  items: loadTasks(),
  filters: { high: true, medium: true, low: true },
  showDone: true,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const { title, priority } = action.payload;
      const maxId = state.items.reduce((acc, e) => Math.max(acc, Number(e.id) || 0), 0);
      const id = (maxId || 0) + 1;
      state.items.unshift({ id, title, priority, completed: false });
    },
    editTask(state, action) {
      const { id, title, priority } = action.payload;
      const e = state.items.find((e) => e.id === id);
      if (!e) return;
      if (title !== undefined) e.title = title;
      if (priority !== undefined) e.priority = priority;
    },
    deleteTask(state, action) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
    toggleComplete(state, action) {
      const e = state.items.find((e) => e.id === action.payload);
      if (e) e.completed = !e.completed;
    },
    togglePriority(state, action) {
      state.filters[action.payload.priority] = action.payload.value;
    },
    toggleShowDone(state, action) {
      state.showDone = action.payload;
    },
    clearDone(state) {
      state.items = state.items.filter((e) => !e.completed);
    },
    setTasks(state, action) {
      state.items = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  clearDone,
  togglePriority,
  toggleShowDone,
  setTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
