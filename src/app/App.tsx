import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { HomePage } from "@/pages/home"
import { AppLayout } from "@/widgets/app-layout"

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
