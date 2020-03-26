import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../../global.css';
import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident()
{
    const [incident_title, setTitle] = useState('');
    const [incident_desc, setDesc] = useState('');
    const [incident_value, setValue] = useState('');

    const history = useHistory();

    async function handleRegisterIncident(e)
    {
        e.preventDefault();

        const data = {
            incident_title,
            incident_desc,
            incident_value
        };

        try {
            await api.post('/incident', data, {
                headers: {
                    Authorization: localStorage.getItem('ongId')
                }
            });
            alert('Novo caso criado com sucesso!');
            
            history.push('/profile');
        } catch (err) {
            alert('Erro ao criar novo caso, tente novamente.');
        }
    }

    return (
       <div className="new-incident-container">
           <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para
                    encontrar um herói para resolver isso.</p>

                    <Link className="goto-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        &nbsp;
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleRegisterIncident}>
                    <input value={incident_title} onChange={e=>setTitle(e.target.value)} placeholder="Título do caso"/>
                    <textarea value={incident_desc} onChange={e=>setDesc(e.target.value)} placeholder="Descrição"/>
                    <input value={incident_value} onChange={e=>setValue((e.target.value).replace(',', '.'))} placeholder="Valor em Reais"/>

                    <button type="button">Cancelar</button>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
           </div>
       </div>
    );
}