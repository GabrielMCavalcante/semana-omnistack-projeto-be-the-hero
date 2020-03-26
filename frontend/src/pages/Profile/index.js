import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            setIncidents(res.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(incident_id) {
        try {
            await api.delete(`/incident/${incident_id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.incident_id != incident_id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo" />
                <span>Bem vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button"><FiPower size={18} color="#e02041" /></button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.incident_id}>
                        <strong>CASO:</strong>
                        <p>{incident.incident_title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.incident_desc}</p>

                        <strong>VALOR:</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.incident_value)}
                        </p>

                        <button onClick={() => handleDeleteIncident(incident.incident_id)} type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}