import { CssBaseline, ThemeProvider } from "@mui/material";
import { Router } from "../Router";
import { theme } from "../../theme";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ErrorToastStore } from "@context/ErrorToastStore/ErrorToastStore";
import { SidebarProvider } from "@context/sidebarContext/sidebarContext";

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <ErrorToastStore>
          <SidebarProvider>
            <CssBaseline />
            <Router />
          </SidebarProvider>
        </ErrorToastStore>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
