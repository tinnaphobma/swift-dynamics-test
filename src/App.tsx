import "./App.css";
import LanguageChanger from "./components/LanguageChanger";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestLayoutAndStyle from "./pages/TestLayoutAndStyle";
import TestFormAndTable from "./pages/TestFormAndTable";

function App() {
  return (
    <>
      <div className="page-container">
        <LanguageChanger
          style={{ position: "absolute", top: "0.5rem", right: "1rem" }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test-layout" element={<TestLayoutAndStyle />} />
          <Route path="/test-form" element={<TestFormAndTable />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
