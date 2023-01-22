import React, { createContext, useContext, useEffect, useReducer } from "react";
import { IUser } from "../api/client";

export interface IAction {
  type: "SET_USER" | "SET_TOKEN";
  payload: any;
}

export interface IAuthState {
  user: IUser | null;
  setUser: (value: IUser | null) => void;
  token: string | null;
  setToken: (value: string | null) => void;
}

const initialState: IAuthState = {
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
};

const authContext = createContext(initialState);

export function useAuthContext() {
  const authState = useContext(authContext);
  return authState;
}

function authReducer(state: IAuthState, action: IAction) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}

function useAuthReducer() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = (value: IUser | null) => {
    dispatch({ type: "SET_USER", payload: value });
  };
  const setToken = (value: string | null) => {
    dispatch({ type: "SET_TOKEN", payload: value });
  };
  return {
    ...state,
    setUser,
    setToken,
  };
}

export default function authContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const authState = useAuthReducer();

  useEffect(() => {
    const token = localStorage.getItem("token");
    authState.setToken(token);
  }, []);

  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  );
}
