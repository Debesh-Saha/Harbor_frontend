import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/dashboard"
import { SharedBrain } from "./pages/SharedBrain"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AboutHarbor } from "./pages/About"
import { Landing } from "./pages/Landing"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/share/:hash" element={<SharedBrain />} />
      <Route path="/about" element={<AboutHarbor/>} />
      <Route path="" element={<Landing/>}/>
    </Routes>
  </BrowserRouter>
}

export default App
