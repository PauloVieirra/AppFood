// Importe o Firebase
import firebase from './FirebaseConect';

// Configuração da persistência de autenticação para manter o usuário logado
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
