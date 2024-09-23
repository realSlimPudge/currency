import React from 'react'
import { useState, useEffect } from 'react'

export default function Convert({ api }) {
	const [list, setList] = useState({})

	useEffect(() => {
		async function fetchData() {
			const client = api
			const data = await client.currencies()
			setList(data.data)
			console.log(list)
		}
		fetchData()
	}, [api])

	return (
		<div className='convert-window'>
			<div className='first'>
				<select className='convert--select'>
					<option value=''>Выберите валюту</option>
					{Object.entries(list).map(([key, value]) => (
						<option key={key} value={key}>
							{value.symbol}
						</option>
					))}
				</select>
				<input type='number' className='convert--input' value={0} />
			</div>
			<div className='second'>
				<select className='convert--select'>
					<option value=''>Выберите валюту</option>
					{Object.entries(list).map(([key, value]) => (
						<option key={key} value={key}>
							{value.symbol}
						</option>
					))}
				</select>
				<input type='number' className='convert--input' value={0} />
			</div>
		</div>
	)
}
