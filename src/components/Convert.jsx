import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'

export default function Convert() {
	const [list, setList] = useState({})
	const [firstCur, setFirstCur] = useState(null)
	const [secondCur, setSecondCur] = useState(null)
	const [firstValue, setFirstValue] = useState(null)
	const [convert, setConvert] = useState(0)
	const [errBtn, setErrBtn] = useState(false)

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
		if (firstCur != null && secondCur != null && firstValue != null) {
			const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${firstCur.value}&to=${secondCur.value}&amount=${firstValue}`
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
				setConvert(result.result)
			} catch (error) {
				console.error(error)
			}
		} else {
			setErrBtn(true)
			setTimeout(() => {
				setErrBtn(false)
			}, 200)
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

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: '#transparent',
			borderTop: 'none',
			borderLeft: 'none',
			borderRight: 'none',
			borderRadius: '1px',
			boxShadow: state.isFocused
				? '0px 0px 5px 2px rgba(253, 2, 136, 0.5)'
				: 'none',
			'&:hover': {
				borderColor: 'rgba(253, 2, 136, 0.5)',
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected
				? 'rgba(253, 2, 136, 0.9)'
				: state.isFocused
				? 'rgba(253, 2, 136, 0.5)'
				: 'black',
			color: state.isSelected ? 'black' : 'white',
		}),
		menuList: provided => ({
			...provided,
			maxHeight: '200px',
			overflowY: 'auto',
			paddingTop: '0',
			paddingBot: '0',

			'&::-webkit-scrollbar': {
				width: '8px',
			},
			'&::-webkit-scrollbar-track': {
				background: 'black',
			},
			'&::-webkit-scrollbar-thumb': {
				background: 'rgba(253, 2, 136, 0.9)',
				borderRadius: '5px',
			},
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: 'white',
		}),
	}

	return (
		<div className='full'>
			<div className='convert-window'>
				<div className='first'>
					<Select
						className='convert--select custom-scrollbar'
						onChange={changeFirstCur}
						value={firstCur}
						options={options}
						placeholder='Выберите валюту'
						styles={customStyles}
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
						styles={customStyles}
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
				<button onClick={getCurrency} className={errBtn ? 'errAnimation' : ''}>
					Получить
				</button>
			</div>
		</div>
	)
}
