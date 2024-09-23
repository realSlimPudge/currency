import './App.css'
import currencyapi from '@everapi/currencyapi-js'
import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Convert from './components/Convert'
import Home from './components/Home'

function App() {
	const containerRef = useRef(null)
	useEffect(() => {
		const handleMouseMove = e => {
			const { clientX, clientY } = e

			const container = containerRef.current
			const { width, height } = container.getBoundingClientRect()

			const x = clientX / width
			const y = clientY / height

			const gradient = `radial-gradient(
		circle at ${x * 100}% ${y * 100}%,
		rgba(122, 52, 89, 1) -50%,
		rgba(5, 33, 42, 1) 35%,
		rgba(9, 9, 9, 1) 100%
	)`
			container.style.background = gradient
		}
		const container = containerRef.current
		container.addEventListener('mousemove', handleMouseMove)

		return () => {
			container.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return (
		<Router>
			<div
				className='App'
				ref={containerRef}
				style={{
					width: '100%',
					height: '100vh',
					background:
						'radial-gradient(circle at center, rgba(122,52,89,1) 0%, rgba(5,33,42,1) 35%, rgba(9,9,9,1) 100%)',
					transition: 'background 0.1s ease',
				}}
			>
				<Header />
				<main className='main--content'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/convert' element={<Convert />} />
					</Routes>
				</main>
			</div>
		</Router>
	)
}

export default App
