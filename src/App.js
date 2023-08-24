import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataDisplay from "./Pages/DataDisplay";
import Home from "./Home";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/datadisplay" element={<DataDisplay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
