import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import '../../global.css';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {

    const [ong_name, setName] = useState('');
    const [ong_email, setEmail] = useState('');
    const [ong_whatsapp, setWhatsapp] = useState('');
    const [ong_city, setCity] = useState('');
    const [ong_uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            ong_name,
            ong_email,
            ong_whatsapp,
            ong_city,
            ong_uf
        };

        try {
            const response = await api.post('/ongs', data);

            alert('Seu ID de acesso: ' + response.data.ong_id);
            history.push('/');
        } catch(err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude
                    pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="goto-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        &nbsp;
                        Voltar para o login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input value={ong_name} onChange={e => setName(e.target.value)} placeholder="Nome da ONG" />
                    <input value={ong_email} onChange={e => setEmail(e.target.value)} type="email" placeholder="E-mail" />
                    <input value={ong_whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="Whatsapp" />

                    <div className="input-group">
                        <input value={ong_city} onChange={e => setCity(e.target.value)} placeholder="Cidade" />
                        <input value={ong_uf} onChange={e => setUf(e.target.value)} placeholder="UF" style={{ width: 80 }} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}