import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

export default function App() {
	return (
		<BrowserRouter>
			<header
				style={{
					borderBottom: '1px solid #ddd',
					padding: '12px 0',
				}}>
				<div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
					<nav style={{ display: 'flex', gap: 16 }}>
						<Link to='/'>Home</Link>
						<Link to='/cart'>Cart</Link>
						<Link to='/contact'>Contact</Link>
					</nav>
				</div>
			</header>

			<main style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/product/:id'
						element={<Product />}
					/>
					<Route
						path='/cart'
						element={<Cart />}
					/>
					<Route
						path='/checkout'
						element={<Checkout />}
					/>
					<Route
						path='/checkout/success'
						element={<Success />}
					/>
					<Route
						path='/contact'
						element={<Contact />}
					/>
				</Routes>
			</main>
		</BrowserRouter>
	);
}
