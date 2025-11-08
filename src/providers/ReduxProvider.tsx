"use client";

import { persistor, store } from "@/shared/store";
import { Provider as ReactReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReactReduxProvider>
  );
}
