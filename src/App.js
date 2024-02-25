import "./App.css";
import "./css/mediaQuery.css"
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NewsList from "./Components/NewsList";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Toaster } from "react-hot-toast"
import NewsForm from "./Components/NewsForm";
import EditPost from "./Components/EditPost";
import PdfSection from "./Components/PdfSection";
import PdfForm from "./Components/PdfForm";
import SearchNews from "./Components/SearchNews";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/new" element={<NewsForm />} />
        <Route path="/new/newspaper" element={<PdfForm />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/newspaper" element={<PdfSection />} />
        <Route path="/search" element={<SearchNews />} />
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;
