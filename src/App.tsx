import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./core/ui/uiContext";
import AppSnackbar from "./core/ui/AppSnackbar";
import { AuthProvider } from "./core/auth/AuthProvider";
import AppRouter from "./app/router";

function App() {
  return (
    <UIProvider>
      <AppSnackbar />
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </UIProvider>
  );
}

export default App;