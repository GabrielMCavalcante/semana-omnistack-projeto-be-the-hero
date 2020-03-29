import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    const [incident, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents() {
        if (loading) return;

        if (total > 0 && incident.length == total) return;

        setLoading(true);

        const response = await api('incident', {
            params: { page }
        });

        setIncidents([...incident, ...response.data]);
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }

    async function reloadIncidents() {
        const response = await api('incident');

        setIncidents(response.data);
        setTotal(response.headers['x-total-count']);
        setPage(page-1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <TouchableOpacity style={styles.reloadButton} onPress={reloadIncidents}>
                <Feather name="refresh-cw" size={22} color="#e02041" />
            </TouchableOpacity>

            <FlatList
                style={styles.incidentList}
                data={incident}
                keyExtractor={incident => String(incident.incident_id - page)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG</Text>
                        <Text style={styles.incidentValue}>{incident.ong_name}</Text>

                        <Text style={styles.incidentProperty}>CASO</Text>
                        <Text style={styles.incidentValue}>{incident.incident_title}</Text>

                        <Text style={styles.incidentProperty}>VALOR</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.incident_value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color='#e02041' />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    );
}