import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Catalog from "./components/Catalog";

import ContextProvider from "./components/ContextProvider";

import Favorites from "./components/Favorites";
import Orders from "./components/Orders";

function App() {
  return (
    <div className="page-wrapper">
      <div className="wrapper">
        <ContextProvider>
          <Header />

          <main className="main">
            <Routes>
              <Route exact path="/" element={<Catalog />} />
              <Route exact path="/favorites" element={<Favorites />} />
              <Route exact path="/orders" element={<Orders />} />
            </Routes>
          </main>

          {/* <Footer /> */}

          <Cart />
        </ContextProvider>
      </div>
    </div>
  );
}

export default App;
