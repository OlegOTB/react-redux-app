import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChange,
  taskCreated,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  getError,
} from "./store/task";
import configureStore from "./store/store";
import { useSelector, Provider, useDispatch } from "react-redux";
// import { titleChange } from "./store/actions";

const store = configureStore();
const App = (params) => {
  // const [state, setState] = useState(store.getState());
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  // console.log(data);

  useEffect(() => {
    // console.log("getTasks");
    dispatch(loadTasks());
    // store.subscribe(() => {
    //   setState(store.getState());
    // });
  }, []);
  // const completeTask = (taskId) => {
  //   store.dispatch(taskCompleted(taskId));
  //   store.dispatch((dispatch, getState) => {
  //     console.log("dispatch ", dispatch);
  //     console.log("getState ", getState);
  //   });
  // };
  const createTask = (titleTask) => {
    dispatch(taskCreated(titleTask));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId));
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <h1>App</h1>
      <button onClick={() => createTask("NewTaskTitle")}>
        Добавить задачу c title: NewTaskTitle
      </button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
