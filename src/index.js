import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import Country from "./Country";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import CardContainer from "./CardContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CardContainer />,
      },
      {
        path: "country/:id",
        loader: async ({ request, params }) => {
          const res = await axios.get(
            `https://restcountries.com/v3.1/name/${params.id}?fullText=true`
          );
          const country = res.data[0];
          country.countryBorders = [];
          if (country.borders) {
            for (let code of country.borders) {
              const borderData = await axios.get(
                `https://restcountries.com/v3.1/alpha/${code}`
              );
              country.countryBorders.push(borderData.data[0]);
            }
          }
          return country;
        },
        element: <Country />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
