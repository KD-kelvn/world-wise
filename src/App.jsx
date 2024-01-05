import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import CityList from "./components/CityList"
import City from "./components/City"
import Form from "./components/Form"
import CountryList from "./components/CountryList"
import SpinnerFullPage from "./components/SpinnerFullPage"
import { AuthProvider } from "./context/FakeAuthContext,"
import { CitiesProvider } from "./context/CitiesContext"
import { Suspense, lazy } from "react"
import ProtectedRoute from "./pages/ProtectedRoute"


const AppLayout = lazy(function () {
  return import("./pages/AppLayout")
});
const NotFound = lazy(function () {
  return import("./pages/NotFound")
});
const Login = lazy(function () {
  return import("./pages/Login")
}
);
const Product = lazy(function () {
  return import("./pages/Product")
}
);
const Home = lazy(function () {
  return import("./pages/Home")
});
const Pricing = lazy(function () {
  return import("./pages/Pricing")
}
);

const App = () => {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="app"
                element={<ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>}
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>

  )
}

export default App
