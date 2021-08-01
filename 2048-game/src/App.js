import "./App.css";
import Cube from "./Cube";

const arr = [
  [2, 0, 4, 8],
  [32, 4, 4, 8],
  [16, 0, 2, 0],
  [2, 4, 4, 8],
];

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="heading">2048 Game</h1>
      </header>
      <section>
        <div className="cont">
          {arr.map((ls) =>
            ls.map((key, index) => <Cube key={index} data={key} />)
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
