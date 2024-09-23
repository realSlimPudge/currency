import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'

export default function Convert() {
	const [list, setList] = useState({})
	const [firstCur, setFirstCur] = useState(null)
	const [secondCur, setSecondCur] = useState(null)
	const [firstValue, setFirstValue] = useState(null)
	const [convert, setConvert] = useState(0)

	const changeFirstCur = e => {
		setFirstCur(e)
	}
	const changeSecondCur = e => {
		setSecondCur(e)
	}
	const changeFirstValue = e => {
		setFirstValue(e.target.value)
	}

	useEffect(() => {
		async function fetchData() {
			const url =
				'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols'
			const options = {
				method: 'GET',
				headers: {
					'x-rapidapi-key':
						'f68855a881msh0afebe99737720fp1d880ejsne04d8120bd60',
					'x-rapidapi-host':
						'currency-conversion-and-exchange-rates.p.rapidapi.com',
				},
			}

			try {
				const response = await fetch(url, options)
				const result = await response.json()
				setList(result)
			} catch (error) {
				console.error(error)
			}
		}
		fetchData()
	}, [])

	async function getCurrency() {
		const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${firstCur.value}&to=${secondCur.value}&amount=${firstValue}`
		const options = {
			method: 'GET',
			headers: {
				'x-rapidapi-key': 'f68855a881msh0afebe99737720fp1d880ejsne04d8120bd60',
				'x-rapidapi-host':
					'currency-conversion-and-exchange-rates.p.rapidapi.com',
			},
		}

		try {
			const response = await fetch(url, options)
			const result = await response.json()
			console.log(result)
			setConvert(result.result)
		} catch (error) {
			console.error(error)
		}
	}

	const options = useMemo(() => {
		return list.symbols
			? Object.entries(list.symbols).map(([key, value]) => ({
					value: key,
					label: key,
			  }))
			: []
	}, [list.symbols])

	return (
		<div className='full'>
			<div className='convert-window'>
				<div className='first'>
					{/* <select
						className='convert--select'
						onChange={changeFirstCur}
						value={firstCur}
					>
						<option value=''>Выберите валюту</option>
						{list.symbols &&
							Object.entries(list.symbols).map(([key, value]) => (
								<option key={key} value={key}>
									{key}
								</option>
							))}
					</select> */}
					<Select
						className='convert--select'
						onChange={changeFirstCur}
						value={firstCur}
						options={options}
						placeholder='Выберите валюту'
					/>
					<input
						type='number'
						className='convert--input'
						onChange={changeFirstValue}
					/>
				</div>
				<div className='second'>
					<Select
						className='convert--select'
						onChange={changeSecondCur}
						value={secondCur}
						options={options}
						placeholder='Выберите валюту'
					/>
					<input
						type='number'
						className='convert--input'
						readOnly
						value={convert}
					/>
				</div>
			</div>
			<div className='btnDiv'>
				<button onClick={getCurrency}>Получить</button>
			</div>
		</div>
	)
}
