import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>header</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
