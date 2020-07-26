import React, { ReactNode } from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { taskReducer } from "./reducers/taskReducer";

const store = createStore(taskReducer, applyMiddleware(thunk));

interface Props {
  children: ReactNode;
}

export default function StateProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
