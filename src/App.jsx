import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;