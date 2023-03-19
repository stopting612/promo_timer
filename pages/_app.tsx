import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SettingProvider from "@/context/settingContext";
import TodoContext, {todoReducer, initState} from "@/context/todoContent";
import { useReducer } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(todoReducer, initState);
  return (
    <TodoContext.Provider value={{state,  dispatch: dispatch}}>
    <SettingProvider >
      <Component {...pageProps} />
    </SettingProvider></TodoContext.Provider>
  );
}
