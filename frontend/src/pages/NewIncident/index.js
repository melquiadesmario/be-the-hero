import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()

    const ngoId = localStorage.getItem('ngoId')

    async function handleNewIncident(event){
        event.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ngoId
                }
            })

            history.push('/profile')
        }catch(err){
            alert('Failed to register case, try again.')
        }
    }

    return(
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={ logoImg } alt='Be The Hero' />
                    <h1>Register New Case</h1>
                    <p>Describe the case in detail to find a hero to solve this.</p>
                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={ 16 } color='#e02041' />
                        Back to Home
                    </Link>
                </section>
                <form onSubmit={ handleNewIncident }>
                    <input
                        placeholder='Case Title'
                        value={ title }
                        onChange={ event => setTitle(event.target.value)}
                    />
                    <textarea
                        placeholder='Description'
                        value={ description }
                        onChange={ event => setDescription(event.target.value)}
                    />
                    <input
                        placeholder='Value in Reais'
                        value={ value }
                        onChange={ event => setValue(event.target.value)}
                    />
                    <button
                        className='button'
                        type='submit'
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
