import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Article from './pages/Article';
import Saved from './pages/Saved';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story/:slug" element={<Article />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} The Daily Bugle · A fan-made demo for The CodeBreakers Club · All stories are fictional.
        </div>
      </footer>
    </>
  );
}
