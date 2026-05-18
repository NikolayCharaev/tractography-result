import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { HomePage } from "@/pages/home"
import { ProstatePage } from "@/pages/prostate"
import { PulmonaryVeinSegmentationPage } from "@/pages/pulmonary-vein-segmentation/ui/PulmonaryVeinSegmentationPage"
import { AppLayout } from "@/widgets/app-layout"
import { ForeignBodies } from "@/pages/foreign-bodies/ui/ForeignBodies"

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/pulmonary-vein-segmentation"
            element={<PulmonaryVeinSegmentationPage />}
          />
          <Route path="/prostate" element={<ProstatePage />} />
          <Route path="/foreign-bodies" element={<ForeignBodies />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
