import * as actionsTypes from "./actionType";

export function taskCompleted(id) {
  return { type: actionsTypes.taskUpdated, payload: { id, completed: true } };
}
export function taskDelete(id) {
  return { type: actionsTypes.taskDelete, payload: { id } };
}
export function titleChange(id) {
  return {
    type: actionsTypes.taskUpdated,
    payload: { id, title: `New title ${id}` },
  };
}
