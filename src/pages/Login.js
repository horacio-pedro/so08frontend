import React, { useState } from 'react'

import logo from '../assets/logo.svg'
import './Login.css'

export default function Login() {
	const[username, setUsername] = useState('')

	function handleSubmit(event) {
		event.preventDafault()

		console.log(username)
	}

	return (
		<div className='login-container'>
			<form onSubmit={handleSubmit}>
				<img src={logo} alt='Tindev'/>
				<input 
					placeholder='Digite o usuário no Github'
					value={username} 
					onChange={event => setUsername(event.target.value)}
				/>
				<button type='submit'>Enviar</button>
			</form>
		</div>
	)
}