import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Rout/Rout";
import "./index.css"
import Authonicate from "./Component/Authonicate/Authonicate";
import HandleContext from "./Component/HandleContext/HandleContext";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import FilterContext from "./Component/FilterContext/FilterContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authonicate>
        <HandleContext>
          <FilterContext>
            <RouterProvider router={Router} />
          </FilterContext>
        </HandleContext>
      </Authonicate>
    </QueryClientProvider>



  </React.StrictMode>
);
