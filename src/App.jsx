import Game from "./pages/Game";
import Footer from "./components/Footer";
import "./styles/global.css";

function App() {
  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1 className="title">
          <span className="logo">🐍</span> Snake Game
        </h1>
      </div>

      {/* Main Game */}
      <div className="main">
        <Game />
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
