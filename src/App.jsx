import HomePage from './Home.jsx';
import BrandsPage from './BrandsPage.jsx';

// The site keeps separate page components and uses clean paths without adding
// a router dependency. Vercel is configured to serve index.html at /brands.
const isBrandsRoute = () => /^\/brands\/?$/.test(window.location.pathname);

export default function App() {
  return isBrandsRoute() ? <BrandsPage /> : <HomePage />;
}
