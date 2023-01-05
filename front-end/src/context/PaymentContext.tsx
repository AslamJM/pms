import React, { createContext, useContext, useReducer } from "react";
import { IPayment } from "../api/client";

export interface IAction {
  type: "SET_ALL_PaymentS" | "SET_SELECTED_Payment";

  payload: any;
}

export interface IPaymentState {
  payments: IPayment[];
  setAllPayments: (value: IPayment[]) => void;
  selectedPayment: IPayment | null;
  setSelectedPayment: (value: IPayment | null) => void;
}

const initialState: IPaymentState = {
  payments: [],
  setAllPayments: () => {},
  selectedPayment: null,
  setSelectedPayment: () => {},
};

const PaymentContext = createContext(initialState);

export function usePaymentContext() {
  const PaymentState = useContext(PaymentContext);
  return PaymentState;
}

function PaymentReducer(state: IPaymentState, action: IAction): IPaymentState {
  switch (action.type) {
    case "SET_ALL_PaymentS":
      return {
        ...state,
        payments: action.payload,
      };
    case "SET_SELECTED_Payment":
      return {
        ...state,
        selectedPayment: action.payload,
      };
    default:
      return state;
  }
}

function usePaymentReducer() {
  const [state, dispatch] = useReducer(PaymentReducer, initialState);

  const setAllPayments = (value: IPayment[]) => {
    dispatch({ type: "SET_ALL_PaymentS", payload: value });
  };

  const setSelectedPayment = (value: IPayment | null) => {
    dispatch({ type: "SET_SELECTED_Payment", payload: value });
  };

  return {
    ...state,
    setAllPayments,
    setSelectedPayment,
  };
}

export default function PaymentContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const globalState = usePaymentReducer();

  return (
    <PaymentContext.Provider value={globalState}>
      {children}
    </PaymentContext.Provider>
  );
}
