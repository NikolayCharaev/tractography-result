import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { HomePage } from "@/pages/home"
import { AppLayout } from "@/widgets/app-layout"

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pulmonary-vein-segmentation" element={<>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe officiis, culpa praesentium unde ex blanditiis nam mollitia reprehenderit veniam veritatis, repudiandae ipsum perspiciatis maiores dignissimos molestias sed. Exercitationem, veniam iste!</>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
