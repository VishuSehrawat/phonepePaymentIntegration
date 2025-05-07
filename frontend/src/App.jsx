import DemoPage from "./DemoPage";
import {Routes,Route} from "react-router-dom"
import SuccessPage from "./SuccessPage";
 

function App() {
  return <>
    <Routes>

      <Route path="/" element={<DemoPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  </>;
}

export default App;
