import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };
// const initialState = [
//   { id: 1, title: "Task 1", completed: false },
//   { id: 2, title: "Task 2", completed: false },
// ];
// const update = createAction("task/updated");
// const remove = createAction("task/remove");

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    create(state, action) {
      state.entities = [
        { userId: state.entities[1].userId, ...action.payload },
        ...state.entities,
      ];
      // console.log(action.payload);
      state.isLoading = false;
    },
    recived(state, action) {
      state.entities = action.payload;
      // console.log(action.payload);
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { create, update, remove, recived, taskRequested, taskRequestFailed } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
    console.log(data);
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export const newTask = (titleTask) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.create(titleTask);
    dispatch(create(data));
    console.log(data);
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export function taskDeleted(id) {
  return remove({ id });
}
export const taskCreated = (titleTask) => (dispatch, getState) => {
  dispatch(newTask(titleTask));
};

export function titleChange(id) {
  return update({ id, title: `New title ${id}` });
}

// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//       state[elementIndex] = { ...state[elementIndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((el) => el.id !== action.payload.id);
//     });
// });

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;
export const getError = () => (state) => state.errors.entities[0];

export default taskReducer;
