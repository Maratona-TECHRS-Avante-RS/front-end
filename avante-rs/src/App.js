import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { GlobalUserProvider } from "./context/index";

function App() {
  return (
    <GlobalUserProvider>
      <RouterProvider router={router} />
    </GlobalUserProvider>
  );
}

export default App;
