import React from 'react-native';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './style';

const BemVindo = () => {
    return (
        <View style={styles.container}>
        <ActivityIndicator size="large" color="#131313" />
        <Text>Entrando...</Text>
        </View>
    );
}

const BuscandoProdutos = () => {
    return (
        <View style={styles.containerone}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Procurando produtos</Text>
        </View>
    );
}


export { BemVindo, BuscandoProdutos};