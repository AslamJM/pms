import React, { createContext, useContext, useReducer } from "react";
import { useQuery } from "react-query";
import { IShop } from "../api/client";
import { shopClient } from "../api/shops";

export interface IAction {
  type: "SET_ALL_SHOPS" | "SET_SELECTED_SHOP";

  payload: any;
}

export interface IShopState {
  shops: IShop[];
  setAllShops: (value: IShop[]) => void;
  selectedShop: IShop | null;
  setSelectedShop: (value: IShop | null) => void;
}

const initialState: IShopState = {
  shops: [],
  setAllShops: () => {},
  selectedShop: null,
  setSelectedShop: () => {},
};

const shopContext = createContext(initialState);

export function useShopContext() {
  const shopState = useContext(shopContext);
  return shopState;
}

function shopReducer(state: IShopState, action: IAction): IShopState {
  switch (action.type) {
    case "SET_ALL_SHOPS":
      return {
        ...state,
        shops: action.payload,
      };
    case "SET_SELECTED_SHOP":
      return {
        ...state,
        selectedShop: action.payload,
      };
    default:
      return state;
  }
}

function useShopReducer() {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const setAllShops = (value: IShop[]) => {
    dispatch({ type: "SET_ALL_SHOPS", payload: value });
  };

  const setSelectedShop = (value: IShop | null) => {
    dispatch({ type: "SET_SELECTED_SHOP", payload: value });
  };

  return {
    ...state,
    setAllShops,
    setSelectedShop,
  };
}

export default function ShopContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const globalState = useShopReducer();
  const { data, isLoading, isError } = useQuery(
    "all shops",
    async () => await shopClient.getAllShops(),
    {
      onSuccess: (data) => globalState.setAllShops(data.shops),
    }
  );
  return (
    <shopContext.Provider value={globalState}>{children}</shopContext.Provider>
  );
}
