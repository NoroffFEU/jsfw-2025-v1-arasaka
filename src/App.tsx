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
			<nav style={{ display: 'flex', gap: '16px' }}>
				<Link to='/'>Home</Link>
				<Link to='/cart'>Cart</Link>
				<Link to='/contact'>Contact</Link>
			</nav>

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
		</BrowserRouter>
	);
}
