import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header>
			<div className='logo'>
				<img
					width='52'
					height='52'
					src='https://img.icons8.com/material-outlined/52/ADADAD/currency-exchange.png'
					alt='currency-exchange'
				/>
			</div>
			<nav className='nav'>
				<Link to='/'>Home</Link>
				<Link to='/convert'>Convert</Link>
			</nav>
			<div className='example-link'>
				<a href='https://dribbble.com/shots/16385191-Currency-Exchange-Landing-Page'>
					My example
				</a>
			</div>
		</header>
	)
}
