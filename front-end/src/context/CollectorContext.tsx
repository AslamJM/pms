import React, { createContext, useContext, useReducer } from "react";
import { useQuery } from "react-query";
import { ICollector } from "../api/client";
import { collectorClient } from "../api/collectors";
export interface IAction {
  type: "SET_ALL_COLLECTORS" | "SET_SELECTED_COLLECTOR";
  payload: any;
}

export interface ICollectorState {
  collectors: ICollector[];
  setAllCollectors: (value: ICollector[]) => void;
  selectedCollector: ICollector | null;
  setSelectedCollector: (value: ICollector | null) => void;
}

const initialState: ICollectorState = {
  collectors: [],
  setAllCollectors: () => {},
  selectedCollector: null,
  setSelectedCollector: () => {},
};

const collectorContext = createContext(initialState);

export function useCollectorContext() {
  const collectorState = useContext(collectorContext);
  return collectorState;
}

function collectorReducer(
  state: ICollectorState,
  action: IAction
): ICollectorState {
  switch (action.type) {
    case "SET_ALL_COLLECTORS":
      return {
        ...state,
        collectors: action.payload,
      };
    case "SET_SELECTED_COLLECTOR":
      return {
        ...state,
        selectedCollector: action.payload,
      };
    default:
      return state;
  }
}

function useCollectorReducer() {
  const [state, dispatch] = useReducer(collectorReducer, initialState);

  const setAllCollectors = (value: ICollector[]) => {
    dispatch({ type: "SET_ALL_COLLECTORS", payload: value });
  };

  const setSelectedCollector = (value: ICollector | null) => {
    dispatch({ type: "SET_SELECTED_COLLECTOR", payload: value });
  };

  return {
    ...state,
    setAllCollectors,
    setSelectedCollector,
  };
}

export default function CollectorContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const globalState = useCollectorReducer();

  const { data, isLoading, isError } = useQuery(
    "all collectors",
    collectorClient.getAllCollectors,
    {
      onSuccess: (data) => globalState.setAllCollectors(data.collectors),
    }
  );

  return (
    <collectorContext.Provider value={globalState}>
      {children}
    </collectorContext.Provider>
  );
}
