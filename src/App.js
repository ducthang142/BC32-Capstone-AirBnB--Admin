import { RouterProvider } from "react-router-dom";
import routes from "./routers/routes";
import { Suspense } from "react";
import Loading from "./components/Loading"

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes}  />
    </Suspense>
  );
}

export default App;
