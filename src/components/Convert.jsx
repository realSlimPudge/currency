import { React, useState, useEffect, useMemo } from 'react'
import Select from 'react-select'

export default function Convert() {
	const [list, setList] = useState({})
	const [firstCur, setFirstCur] = useState(null)
	const [secondCur, setSecondCur] = useState(null)
	const [firstValue, setFirstValue] = useState('')
	const [convert, setConvert] = useState('')
	const [errBtn, setErrBtn] = useState(false)
	const [fontSize, setFontSize] = useState(82)
	const [fontSizeSecond, setFontSizeSecond] = useState(82)

	const changeFirstCur = e => {
		setFirstCur(e)
	}
	const changeSecondCur = e => {
		setSecondCur(e)
	}
	const changeFirstValue = e => {
		setFirstValue(e.target.value)
	}
	const selectText = e => {
		e.target.select()
	}

	useEffect(() => {
		if (convert.length > 6 && convert.length < 10) {
			setFontSizeSecond(82)
		} else if (convert.length >= 10) {
			setFontSizeSecond(64)
		} else {
			setFontSizeSecond(128)
		}
	}, [convert])

	useEffect(() => {
		if (firstValue.length > 6 && firstValue.length < 10) {
			setFontSize(82)
		} else if (firstValue.length >= 10) {
			setFontSize(64)
		} else {
			setFontSize(128)
		}
	}, [firstValue])

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
		if (firstCur && secondCur && firstValue) {
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
			border: 'none',
			padding: '10px',
			borderRadius: '10px',
			transition: 'all 300ms ease',
			boxShadow: state.isFocused
				? '0px 0px 5px 2px rgba(253, 2, 136, 0.5)'
				: '0px 0px 1px 0px rgba(255, 255, 255, 0.9)',
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected
				? 'rgba(253, 2, 136, 1)'
				: state.isFocused
				? 'rgb(175, 16, 101)'
				: 'black',
			color: 'white',
			fontWeight: state.isSelected ? '600' : '300',
			borderRadius: '15px',
			marginBottom: '15px',
			cursor: 'pointer',
			transition: '300ms ease-out all',
		}),
		input: (provided, state) => ({
			...provided,
			color: 'white',
			fontWeight: '300',
		}),
		menuList: provided => ({
			...provided,
			maxHeight: '300px',
			overflowY: 'auto',
			paddingTop: '5px',
			paddingBot: '5px',
			paddingRight: '10px',
			paddingLeft: '10px',

			'&::-webkit-scrollbar': {
				width: '8px',
			},
			'&::-webkit-scrollbar-track': {
				background: 'black',
				borderRadius: '5px',
			},
			'&::-webkit-scrollbar-thumb': {
				background: 'rgba(253, 2, 136, 0.9)',
				borderRadius: '5px',
			},
		}),
		menu: provided => ({
			...provided,
			paddingRight: '10px',
			background: 'transparent',
			backgroundColor: 'rgba(255, 255, 255, 0.05)',
			backdropFilter: 'blur(10px)',
			borderRadius: '15px',
			boxShadow: 'none',
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: 'white',
			fontWeight: '500',
		}),
	}

	const handleInputChange = inputValue => {
		return inputValue.toUpperCase()
	}

	return (
		<div className='full'>
			<div className='convert-window'>
				<div className='first'>
					<Select
						className='convert--select'
						onChange={changeFirstCur}
						value={firstCur}
						options={options}
						placeholder='Выберите валюту'
						styles={customStyles}
						onInputChange={handleInputChange}
					/>

					<input
						defaultValue={0}
						type='number'
						className='convert--input'
						onChange={changeFirstValue}
						onClick={selectText}
						style={{ fontSize: `${fontSize}px` }}
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
						onInputChange={handleInputChange}
					/>

					<input
						type='number'
						className='convert--input'
						readOnly
						value={convert}
						style={{ fontSize: `${fontSizeSecond}px` }}
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
