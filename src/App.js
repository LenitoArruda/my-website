import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "./components/pages/Home";

// LAYOUTS
import Container from "./components/layouts/Container";

function App() {
  return (
    <Router>
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
