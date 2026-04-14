import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import ProductsIndexPage from './pages/ProductsIndexPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionsIndexPage from './pages/CollectionsIndexPage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import DesignersIndexPage from './pages/DesignersIndexPage';
import DesignerDetailPage from './pages/DesignerDetailPage';
import ProjectsIndexPage from './pages/ProjectsIndexPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import SustainabilityPage from './pages/SustainabilityPage';
import MaterialsPage from './pages/MaterialsPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          
          <Route path="products" element={<ProductsIndexPage />} />
          <Route path="products/:category" element={<CategoryPage />} />
          <Route path="product/:slug" element={<ProductDetailPage />} />
          
          <Route path="collections" element={<CollectionsIndexPage />} />
          <Route path="collections/:slug" element={<CollectionDetailPage />} />
          
          <Route path="designers" element={<DesignersIndexPage />} />
          <Route path="designers/:slug" element={<DesignerDetailPage />} />
          
          <Route path="projects" element={<ProjectsIndexPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          
          <Route path="ai-generator" element={<AIGeneratorPage />} />
          
          <Route path="sustainability" element={<SustainabilityPage />} />
          <Route path="materials" element={<MaterialsPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="cookie-policy" element={<CookiePolicyPage />} />
          <Route path="terms-of-use" element={<TermsOfUsePage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
