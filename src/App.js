import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "./components/pages/Home";

// LAYOUTS
import Container from "./components/layouts/Container";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
