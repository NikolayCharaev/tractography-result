import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AuthProvider, ProtectedRoute } from "@/features/app-auth"
import { HomePage } from "@/pages/home"
import { ProstatePage } from "@/pages/prostate"
import { PulmonaryVeinSegmentationPage } from "@/pages/pulmonary-vein-segmentation/ui/PulmonaryVeinSegmentationPage"
import { AppLayout } from "@/widgets/app-layout"
import { ForeignBodiesBreast } from "@/pages/foreign-bodies-breast/ui/ForeignBodiesBreast"
import { ForeignBodiesHip } from "@/pages/foreign-bodies-hip/ui/ForeignBodiesHip"
import { BreastSegmentation } from "@/pages/breast-segmentation"
import { HeartSegmentation } from "@/pages/heart-segmentation"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/pulmonary-vein-segmentation"
              element={
                <PulmonaryVeinSegmentationPage />
              }
            />
            <Route
              path="/prostate"
              element={
                <ProstatePage />
              }
            />
            <Route
              path="/foreign-bodies-breast"
              element={
                <ProtectedRoute>
                  <ForeignBodiesBreast />
                </ProtectedRoute>
              }
            />
            <Route
              path="/breast-segmentation"
              element={
                <BreastSegmentation />
              }
            />

            <Route
              path="/heart-segmentation"
              element={
                <HeartSegmentation />
              }
            />
            <Route
              path="/foreign-bodies-hip"
              element={
                <ProtectedRoute>
                  <ForeignBodiesHip />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
