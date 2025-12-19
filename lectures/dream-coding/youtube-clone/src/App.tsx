import { Outlet } from "react-router-dom";

import Header from "./Components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
