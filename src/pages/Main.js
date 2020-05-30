import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../services/api'
import'./Main.css'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import unlike from '../assets/dislike.svg'

 export default function Main({ match }) {
	const [users, setUsers] = useState([])

	async function handleLike(id) {
		await api.post(`/devs/${id}/likes`, null, {
			headers: { user: match.params.id},
		})
		setUsers(users.filter(user => user._id !== id))
	}
	async function handleUnLike(id) {
		await api.post(`/devs/${id}/unlikes`, null, {
			headers: { user: match.params.id},
		})
		setUsers(users.filter(user => user._id !== id))
	}

	useEffect(() => {
		async function loadUsers() {
			const response = await api.get('/devs', {
				headers: { 
					user: match.params.id
				}
			})
			setUsers(response.data)
		}

		loadUsers()
	}, [match.params.id])

	 return (
		<div className='main-container'>
			<Link to='/'>
				<img src={logo} alt='Tindev' />
			</Link>
			{ users.length > 0 ? (
				<ul>
					{users.map(user => (
						<li key={user._id}>
							<img src={user.avatar} alt={user.user} />
							<footer>
								<strong>{user.name}</strong>
								<p>{user.bio}</p>
							</footer>
							<div className='buttons'>
								<button type='button' onClick={() => handleLike(user._id)}>
									<img src={like} alt='like' />
								</button>
								<button type='button' onClick={() => handleUnLike(user._id)}>
									<img src={unlike} alt='unlike' />
								</button>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className='empty'>Acabou :(</div>
			) }
		</div>
	)
 }