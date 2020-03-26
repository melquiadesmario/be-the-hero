import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(event){
        event.preventDefault()
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try{
            const response = await api.post('ongs', data)
            alert(`Your access ID: ${ response.data.id }`)
            history.push('/')
        }catch(err){
            alert('Registration error try again.')
        }
    }

    return(
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={ logoImg } alt='Be The Hero' />
                    <h1>Register</h1>
                    <p>Register, enter the platform and help people find the cases of your NGO.</p>
                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={ 16 } color='#e02041' />
                        Back to Logon
                    </Link>
                </section>
                <form onSubmit={ handleRegister }>
                    <input
                        placeholder='Name of the NGO'
                        value={ name }
                        onChange={ event => setName(event.target.value) }
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={ email }
                        onChange={ event => setEmail(event.target.value) }
                    />
                    <input
                        placeholder='WhatsApp'
                        value={ whatsapp }
                        onChange={ event => setWhatsapp(event.target.value) }
                    />
                    <div className='input-group'>
                        <input
                            placeholder='City'
                            value={ city }
                            onChange={ event => setCity(event.target.value) }
                        />
                        <input
                            placeholder='UF'
                            style={{ width: 80 }}
                            value={ uf }
                            onChange={ event => setUf(event.target.value) }
                        />
                    </div>
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