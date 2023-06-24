import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Files from "./components/Files";

function App() {
  return (
    <>
      <Header/>
      <div className="App">
        <Sidebar/>
        <Files/>
      </div>
    </>
  );
}

export default App;
