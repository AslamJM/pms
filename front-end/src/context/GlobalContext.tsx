import React, { createContext, useContext, useReducer } from "react";

export interface IAction {
  type:
    | "SET_SNACKBAR"
    | "SET_SNACKBAR_MESSAGE"
    | "SET_EDIT_OPEN"
    | "SET_DELETE_OPEN"
    | "SET_LOADING"
    | "SET_ADD_OPEN";

  payload: any;
}

export interface IGlobalState {
  snackOpen: boolean;
  snackMessage: string;
  setSnackOpen: (value: boolean) => void;
  setSnackMessage: (value: string) => void;
  editModalOpen: boolean;
  setEditModalOpen: (value: boolean) => void;
  deleteModalOpen: boolean;
  setDeleteModalOpen: (value: boolean) => void;
  addModalOpen: boolean;
  setAddModalOpen: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const initialState: IGlobalState = {
  snackMessage: "",
  snackOpen: false,
  setSnackOpen: () => {},
  setSnackMessage: () => {},
  editModalOpen: false,
  setEditModalOpen: () => {},
  deleteModalOpen: false,
  setDeleteModalOpen: () => {},
  addModalOpen: false,
  setAddModalOpen: () => {},
  loading: false,
  setLoading: () => {},
};

const globalContext = createContext(initialState);

export function useGlobalContext() {
  const globalState = useContext(globalContext);
  return globalState;
}

function globalReducer(state: IGlobalState, action: IAction): IGlobalState {
  switch (action.type) {
    case "SET_SNACKBAR":
      return {
        ...state,
        snackOpen: action.payload,
      };
    case "SET_SNACKBAR_MESSAGE":
      return {
        ...state,
        snackMessage: action.payload,
      };
    case "SET_EDIT_OPEN":
      return {
        ...state,
        editModalOpen: action.payload,
      };
    case "SET_DELETE_OPEN":
      return {
        ...state,
        deleteModalOpen: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ADD_OPEN":
      return {
        ...state,
        addModalOpen: action.payload,
      };
    default:
      return state;
  }
}

function useGlobalReducer() {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const setSnackOpen = (value: boolean) => {
    dispatch({ type: "SET_SNACKBAR", payload: value });
  };
  const setSnackMessage = (value: string) => {
    dispatch({ type: "SET_SNACKBAR_MESSAGE", payload: value });
  };
  const setEditModalOpen = (value: boolean) => {
    dispatch({ type: "SET_EDIT_OPEN", payload: value });
  };
  const setDeleteModalOpen = (value: boolean) => {
    dispatch({ type: "SET_DELETE_OPEN", payload: value });
  };
  const setLoading = (value: boolean) => {
    dispatch({ type: "SET_LOADING", payload: value });
  };
  const setAddModalOpen = (value: boolean) => {
    dispatch({ type: "SET_ADD_OPEN", payload: value });
  };
  return {
    ...state,
    setSnackOpen,
    setSnackMessage,
    setEditModalOpen,
    setDeleteModalOpen,
    setAddModalOpen,
    setLoading,
  };
}

export default function GlobalContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const globalState = useGlobalReducer();
  return (
    <globalContext.Provider value={globalState}>
      {children}
    </globalContext.Provider>
  );
}
