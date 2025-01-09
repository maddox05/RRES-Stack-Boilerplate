import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRouter from "./AppRouter";
import FlashMessage from "./components/flashmessage/FlashMessage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <FlashMessage />
      <AppRouter />
    </Provider>
  </StrictMode>
);
