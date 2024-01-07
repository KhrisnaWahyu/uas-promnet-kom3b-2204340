import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/index"
import Sidebar from "./scenes/global/Sidebar";
import Transaksi from "./scenes/Transaksi/index";
import DeleteTransaksi from "./scenes/DeleteTransaksi/index";
import CreateTransaksi from "./scenes/CreateTransaksi/indexv1";
import EditTransaksi from "./scenes/EditTransaksi/index";

function App() {
  const [theme, colorMode] = useMode();

  return (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Transaksi" element={<Transaksi />} />
              <Route path="/DeleteTransaksi" element={<DeleteTransaksi />} />
              <Route path="/CreateTransaksi" element={<CreateTransaksi />} />
              <Route path="/EditTransaksi" element={<EditTransaksi />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
