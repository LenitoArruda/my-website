import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES

// LAYOUTS
import Container from "./components/layouts/Container";
import Navbar from "./components/layouts/Navbar";

function App() {
  return (
    <Router>
      <Container customClass="min-height">
      <Navbar />
        <Routes>
          <Route path="/"></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
