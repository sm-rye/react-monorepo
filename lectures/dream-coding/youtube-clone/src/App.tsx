import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "./Components/Header/Header";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <main>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={true} />
        </main>
      </QueryClientProvider>
      <footer>footer</footer>
    </>
  );
}

export default App;
