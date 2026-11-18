import HomePage from './Home.jsx';
import BrandsPage from './BrandsPage.jsx';
import ExcavatorsPage from './ExcavatorsPage.jsx';

const path = window.location.pathname.replace(/\\/+$/, '') || '/';

export default function App() {
  if (path === '/brands') return <BrandsPage />;
  if (path === '/excavators') return <ExcavatorsPage />;
  return <HomePage />;
}
