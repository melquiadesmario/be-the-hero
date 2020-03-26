import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ngoId = localStorage.getItem('ngoId')
    const ngoName = localStorage.getItem('ngoName')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ngoId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ngoId])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${ id }`, {
                headers: {
                    Authorization: ngoId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Failed to delete case, try again.')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className='profile-container'>
            <header>
                <img src={ logoImg } alt='Be The Hero' />
                <span>Wellcome, { ngoName }</span>
                <Link className='button' to='/incidents/new'>
                    Register new case
                </Link>
                <button
                    className=''
                    type='button'
                    onClick={ handleLogout }
                >
                    <FiPower size={ 18 } color='#e02041' />
                </button>
            </header>
            <h1>Registered Cases</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={ incident.id }>
                        <strong>CASE:</strong>
                        <p>{ incident.title }</p>
                        <strong>Description:</strong>
                        <p>{ incident.description }</p>
                        <strong>Value:</strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>
                        <button
                            type='button'
                            onClick={ () => handleDeleteIncident(incident.id) }
                        >
                            <FiTrash2 size={ 20 } color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
