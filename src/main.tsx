import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import './style.css';

const Home = React.lazy(() => import('./pages/Home'));
const Platform = React.lazy(() => import('./pages/Platform'));
const Solutions = React.lazy(() => import('./pages/Solutions'));
const Industries = React.lazy(() => import('./pages/Industries'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const CaseStudy = React.lazy(() => import('./pages/CaseStudy'));
const Insights = React.lazy(() => import('./pages/Insights'));
const Insight = React.lazy(() => import('./pages/Insight'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Contact = React.lazy(() => import('./pages/Contact'));
const About = React.lazy(() => import('./pages/About'));
const Faq = React.lazy(() => import('./pages/Faq'));
const Security = React.lazy(() => import('./pages/Security'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading page">
      <div className="page-loader-spinner" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="platform" element={<Platform />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="industries" element={<Industries />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="case-studies/:slug" element={<CaseStudy />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insights/:slug" element={<Insight />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<Faq />} />
            <Route path="security" element={<Security />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>
);
