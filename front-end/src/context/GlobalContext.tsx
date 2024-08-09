import React, { createContext, useContext, useReducer } from "react";
import { useQuery } from "react-query";
import { ICompany, IArea, IShop, IPayment, getCompanyPayments } from '../api/client';
import { getAllCompanies, getAllAreas, getAllShops } from "../api/company";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { paymentClient } from "../api/payments";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Colombo");
export interface IAction {
  type:
    | "SET_SNACKBAR"
    | "SET_SNACKBAR_MESSAGE"
    | "SET_EDIT_OPEN"
    | "SET_DELETE_OPEN"
    | "SET_LOADING"
    | "SET_ADD_OPEN"
    | "SET_COMPANIES"
    | "SET_AREAS"
    | "SET_PARAMS"
    | "RESET_PARAMS"
    | "SET_SELECTED_COMPANY"
    | "SET_AREAS_FROM_IAREA"
    | "SET_PAYMENTS"
    | "SET_SHOPS"
    | "SET_DUE_PAYMENTS"
    | "SET_COMPANY_PAYMENTS";
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
  companies: ICompany[];
  setComapnies: (value: ICompany[]) => void;
  areas: IArea[];
  shops: IShop[];
  setAreas: (value: IArea[]) => void;
  setShops: (value: IShop[]) => void;
  params: any;
  setParams: (value: any) => void;
  resetParams: (value: any) => void;
  selectedCompany: string | null;
  setSelectedCompany: (company: string | null) => void;
  payments: Array<{ area: string, totalPayment: number }>;
  setPayments: (value: Array<{ area: string, totalPayment: number }>) => void;
  duePayments: IPayment[];
  setDuePayments: (value: IPayment[]) => void;
  companyPayments: { companyName: string, totalPayment: number, paid: number, due: number }[]; // Add this line
  setCompanyPayments: (value: { companyName: string, totalPayment: number, paid: number, due: number }[]) => void;
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
  companies: [],
  setComapnies: () => {},
  areas: [],
  shops: [],
  setAreas: () => {},
  setShops: () => {},
  params: { paymentDate: dayjs() },
  setParams: () => {},
  resetParams: () => {},
  selectedCompany: null,
  setSelectedCompany: () => {},
  payments: [],
  setPayments: () => {},
  duePayments: [],
  setDuePayments: () => {},
  companyPayments: [],
  setCompanyPayments: () => {},
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
    case "SET_COMPANIES":
      return {
        ...state,
        companies: action.payload,
      };
    case "SET_AREAS":
      return {
        ...state,
        areas: action.payload,
      };
    case "SET_AREAS_FROM_IAREA":
      return {
        ...state,
        areas: action.payload,
      };
    case "SET_PARAMS":
      return {
        ...state,
        params: { ...state.params, ...action.payload },
      };
    case "RESET_PARAMS":
      return {
        ...state,
        params: action.payload,
      };
    case "SET_SELECTED_COMPANY":
      return {
        ...state,
        selectedCompany: action.payload,
      };
    case "SET_PAYMENTS":
        return {
            ...state,
            payments: action.payload,
        };
    case "SET_SHOPS":
        return {
            ...state,
            shops: action.payload,
        };
    case "SET_DUE_PAYMENTS":
      return {
        ...state,
        duePayments: action.payload,
      };
    case "SET_COMPANY_PAYMENTS":
      return {
        ...state,
        companyPayments: action.payload,
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
  const setComapnies = (value: ICompany[]) => {
    dispatch({ type: "SET_COMPANIES", payload: value });
  };
  const setParams = (value: any) => {
    dispatch({ type: "SET_PARAMS", payload: value });
  };
  const resetParams = (value: any) => {
    dispatch({ type: "RESET_PARAMS", payload: value });
  };
  const setAreas = (value: IArea[]) => {
    dispatch({ type: "SET_AREAS", payload: value });
  };
  const setAreasFromIArea = (value: IArea[]) => {
    dispatch({ type: "SET_AREAS_FROM_IAREA", payload: value });
  };
  const setSelectedCompany = (company: string | null) => {
    dispatch({ type: "SET_SELECTED_COMPANY", payload: company });
  };
  const setPayments = (value: Array<{ area: string, totalPayment: number }>) => {
    dispatch({ type: "SET_PAYMENTS", payload: value });
  };
  const setShops = (value: IShop[]) => {
    dispatch({ type: "SET_SHOPS", payload: value });
  };
  const setDuePayments = (value: IPayment[]) => {
    dispatch({ type: "SET_DUE_PAYMENTS", payload: value });
  };
  const setCompanyPayments = (value: { companyName: string, totalPayment: number, paid: number, due: number }[]) => {
    dispatch({ type: "SET_COMPANY_PAYMENTS", payload: value });
  };
  return {
    ...state,
    setSnackOpen,
    setSnackMessage,
    setEditModalOpen,
    setDeleteModalOpen,
    setAddModalOpen,
    setLoading,
    setComapnies,
    setParams,
    resetParams,
    setAreas,
    setShops,
    setSelectedCompany,
    setAreasFromIArea,
    setPayments,
    setDuePayments,
    setCompanyPayments,
  };
}


export default function GlobalContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const globalState = useGlobalReducer();
  const { data } = useQuery("all companies", getAllCompanies, {
    onSuccess: (data) => globalState.setComapnies(data.companies),
  });

  useQuery("all areas", getAllAreas, {
    onSuccess: (data) => globalState.setAreasFromIArea(data.areas as IArea[]),
  });

  useQuery("all shops", getAllShops, {
    onSuccess: (data) => globalState.setShops(data.shops as IShop[]),
  });

  useQuery("due payments", paymentClient.getDuePayments, {
    onSuccess: (data) => globalState.setDuePayments(data),
  });

  useQuery("company payments", getCompanyPayments, {
    onSuccess: (data) => globalState.setCompanyPayments(data),
  });

  return (
    <globalContext.Provider value={globalState}>
      {children}
    </globalContext.Provider>
  );
}
