import { React, useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
	const [indicator, setIndicator] = useState({ left: 0, width: 0 })
	const navRef = useRef(null)
	const location = useLocation()

	useEffect(() => {
		const updateInd = () => {
			if (navRef.current) {
				const activeLink = navRef.current.querySelector(
					`[href="${location.pathname}"]`
				)
				if (activeLink) {
					const linkRect = activeLink.getBoundingClientRect()
					const navRect = navRef.current.getBoundingClientRect()
					setIndicator({
						left: linkRect.left - navRect.left,
						width: linkRect.width,
					})
				}
			}
		}
		updateInd()
		window.addEventListener('resize', updateInd)
		return () => window.removeEventListener('resize', updateInd)
	}, [location])

	return (
		<header>
			<div className='logo'>
				<img
					draggable='false'
					width='52'
					height='52'
					src='https://img.icons8.com/material-outlined/52/ADADAD/currency-exchange.png'
					alt='currency-exchange'
				/>
			</div>
			<nav className='nav' ref={navRef}>
				<Link to='/' draggable='false'>
					Home
				</Link>
				<Link to='/convert' draggable='false'>
					Convert
				</Link>
				<div
					className='indicator'
					style={{
						left: `calc(${indicator.left}px + 7.5px)`,
						width: `calc(${indicator.width}px - 15px)`,
					}}
				></div>
			</nav>
			<div className='example-link'>
				<a href='https://dribbble.com/shots/16385191-Currency-Exchange-Landing-Page'>
					My example
				</a>
			</div>
		</header>
	)
}
