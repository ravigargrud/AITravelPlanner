import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Planner from "./pages/Planner";
import Itinerary from "./pages/Itinerary";
import { ItineraryContext } from "./store/ItineraryStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/planner",
    element: <Planner />,
  },
  {
    path: "/itinerary",
    element: <Itinerary />,
  },
]);

function App() {
  const [jsonResponse, setJsonResponse] = useState({});

  return (
    <ItineraryContext.Provider value={{ jsonResponse, setJsonResponse }}>
      <RouterProvider router={router} />
    </ItineraryContext.Provider>
  );
}

export default App;