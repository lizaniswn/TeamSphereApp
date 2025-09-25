import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {
    todo: [
      { id: 'task-1', text: 'Task 1' },
      { id: 'task-2', text: 'Task 2' }
    ],
    inProgress: [
      { id: 'task-3', text: 'Task 3' }
    ],
    done: []
  },
  theme: 'light'
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    moveTask: (state, action) => {
      const { from, to, sourceIndex, destinationIndex } = action.payload;
      // Remove the task from the source column
      const [movedTask] = state.tasks[from].splice(sourceIndex, 1);
      // Insert the task into the destination column at the correct index
      if (movedTask) {
        state.tasks[to].splice(destinationIndex, 0, movedTask);
      }
    }
  }
});

export const { setTheme, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
