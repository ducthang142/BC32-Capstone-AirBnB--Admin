import { RouterProvider } from "react-router-dom";
import routes from "./routers/routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RouterProvider router={routes}  />
    </Suspense>
  );
}

export default App;
