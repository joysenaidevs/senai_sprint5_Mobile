import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: []

        }
    }

    // função para fazer o logout
    logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.warn(error);
        }
    };

    // função para listar os projetos
    getProjects = async () => {

        // constante para armazenar o valor do token
        const valorToken = await AsyncStorage.getItem('userToken');

        // constante para armazenar a resposta da requisição
        const resposta = await api.get('/projeto', {

            // autorização
            headers: {
                'Authorization': 'Bearer ' + valorToken
            }
        })

        // atualiza o state da lista com a resposta da requisição
        this.setState({ projectList: resposta.data })

        // exibe a resposta no console
        console.warn(resposta)
        //exibe a lista de projetos no console
        console.warn(this.state.projectList)

    }

    // faz a chamada para a função de listar quando a tela é renderizada
    componentDidMount() {

        this.getProjects();

    }

    render() {

        return (

            <View style={styles.main}>

                {/* Header */}
                <View style={styles.mainHeader}>

                    <View style={styles.contentHeader}>

                        <View >
                            <Text style={styles.mainHeaderText}>Lista de Projetos</Text>
                        </View>


                        <TouchableOpacity
                            onPress={this.logout}
                        >
                            <Image
                                source={require('../../assets/img/logout1.png')}
                                style={styles.iconLogout}
                            />
                        </TouchableOpacity>



                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={this.getProjects}
                        >
                            <Image
                                source={require('../../assets/img/update.png')}
                                style={styles.iconUpdate}
                            />
                        </TouchableOpacity>

                    </View>

                </View>

                {/* Lista */}
                <ScrollView style={styles.mainBody}>

                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.projectList}
                        keyExtractor={item => item.IdProjeto}
                        renderItem={this.renderItem}
                    />

                </ScrollView>

            </View>
        );
    }

    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>
                <Text style={styles.flatItemTitle}>{item.nomeProjeto}</Text>
                <Text style={styles.flatItemInfo}>Tema: {item.idTemaNavigation.nomeTema}</Text>
                <Text style={styles.flatItemInfo}>Descrição: {item.descricao}</Text>
                <View style={styles.mainHeaderLine} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    mainHeader: {
        flex: .2,
        // backgroundColor: 'blue'
    },

    contentHeader: {
        flexDirection: 'row',
        marginTop: 40,
        // backgroundColor: 'pink',
    },

    iconLogout: {
        width: 25,
        height: 25,
        tintColor: '#561B75',
        marginLeft: 120
    },

    iconUpdate: {
        width: 25,
        height: 25,
        marginTop: 15,
        tintColor: '#561B75',
        marginLeft: 303
    },

    mainHeaderText: {
        fontSize: 20,
        color: '#561B75',
        fontFamily: 'Open Sans',
        marginLeft: 30,
        textDecorationLine: 'underline'
    },

    mainBody: {
        flex: 5,
        // backgroundColor: 'red'
    },

    mainBodyContent: {
        paddingTop: 10,
        paddingRight: 30,
        paddingLeft: 30
    },

    flatItemRow: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: '#B338F5',
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        shadowColor: "#B338F5",
        shadowOpacity: 0.8,
        shadowRadius: 2
    },

    flatItemContainer: {
        flex: 1
    },

    flatItemTitle: {
        fontSize: 16,
        color: '#561B75',
        fontFamily: 'Open Sans',
        paddingLeft: 10
    },

    flatItemInfo: {
        fontSize: 12,
        // #RRGGBB
        // #RGB
        color: '#561B75',
        lineHeight: 20,
        fontFamily: 'Open Sans Light',
        paddingLeft: 10
    }

});