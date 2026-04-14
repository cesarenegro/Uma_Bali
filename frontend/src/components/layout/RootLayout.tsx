import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../shop/CartDrawer';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-bgPrimary text-textPrimary font-body relative">
      {/* Example Top Banner */}
      <div className="bg-espresso text-linen text-center py-2 text-caption">
        Welcome to UMA BALI. Shipping worldwide.
      </div>
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
