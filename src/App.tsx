import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/home/HomePage';
import CategoriasPage from './pages/shop/CategoriasPage';
import ProductosPage from './pages/shop/ProductosPage';
import SingleProductPage from './pages/shop/SingleProductPage';
import CarritoPage from './pages/shop/CarritoPage';
import LoginPage from './pages/auth/LoginPage';
import RegistroPage from './pages/auth/RegistroPage';
import ContactoPage from './pages/contacto/ContactoPage';
import BlogPage from './pages/blog/BlogPage';
import SingleBlogPage from './pages/blog/SingleBlogPage';
import UsuarioPage from './pages/profile/UsuarioPage';
import FaqPage from './pages/info/FaqPage';
import NotFoundPage from './pages/info/NotFoundPage';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Header y Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/producto/single" element={<SingleProductPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/single" element={<SingleBlogPage />} />
          <Route path="/profile" element={<UsuarioPage />} />
        </Route>

        {/* Rutas sin Header ni Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
