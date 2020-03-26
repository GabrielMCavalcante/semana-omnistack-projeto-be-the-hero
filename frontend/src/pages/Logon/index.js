import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'

import api from '../../services/api';

import '../../global.css';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon()
{
    const [ong_id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e)
    {   
        e.preventDefault();
        try {
            const response = await api.post('/sessions', { ong_id });
            
            localStorage.setItem('ongId', ong_id);
            localStorage.setItem('ongName', response.data.ong_name);

            console.log(response.data.ong_name);
            
            history.push('/profile');
            
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input value={ong_id} onChange={e=>setId(e.target.value)} type="text" placeholder="Sua ID"/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="goto-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        &nbsp;
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}