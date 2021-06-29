import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import api from '../services/api';

export default class ProjectRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NomeProjeto: '',
            IdTema: 0,
            Descricao: '',
            isLoading: false
        }
    }

    logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.warn(error);
        }
    };

    atualizaTema = (itemValue) => {
        this.setState({ IdTema: itemValue })
    }

    // função para cadastrar um projeto
    postProjects = async () => {

        // requisição em andamento
        this.setState({ isLoading: true });

        // corpo da requisição
        let project = {
            NomeProjeto: this.state.NomeProjeto,
            IdTema: this.state.IdTema,
            Descricao: this.state.Descricao,
            // NomeTema: this.state.NomeTema
        }

        // constante para armazenar o valor do token
        const valorToken = await AsyncStorage.getItem('userToken');
        console.log(project)

        // chamada para api - método cadastrar e o corpo da requisição
        await api.post('/projeto', project, {
            headers: {
                'Authorization': 'Bearer ' + valorToken
            }
        })

            // verifica a resposta da requisição
            .then(resposta => {

                // caso seja 201
                if (resposta.status === 201) {

                    // retorna uma mensagem 
                    console.warn('Projeto cadastrado !')


                    // requisição finalizada
                    this.setState({ isLoading: false })
                }
            })

            // caso ocorra um erro
            .catch(erro => {

                // exibe uma mensagem 
                console.warn(erro)

                // requisição finalizada
                this.setState({ isLoading: false })
            })

    };

    // renderiza a tela
    render() {

        return (

            <View style={styles.main}>

                {/* Header */}
                <View style={styles.mainHeader}>

                    <View style={styles.contentHeader}>

                        <View >
                            <Text style={styles.mainHeaderText}>Novo Projeto</Text>
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

                </View>



                {/* Formulário para o cadastro e buttom */}
                <View style={styles.mainBody}>

                    <View style={styles.contentInputs}>

                        <TextInput
                            style={styles.inputRegister}
                            placeholder='Título'
                            placeholderTextColor='#561B75'
                            keyboardType='text'
                            onChangeText={NomeProjeto => this.setState({ NomeProjeto })}
                        />

                        <Picker
                            style={styles.inputRegister}
                            selectedValue={this.state.NomeTema}
                            onValueChange={(itemValue, itemIndex) =>
                                this.atualizaTema(itemValue)
                            }>

                            <Picker.Item label="Selecione o Tema" value="" />
                            <Picker.Item label="Gestão" value="1" />
                            <Picker.Item label="HQ's" value="2" />
                        </Picker>


                        <TextInput
                            style={styles.inputRegister}
                            placeholder='Descrição'
                            placeholderTextColor='#561B75'
                            keyboardType='text'
                            onChangeText={Descricao => this.setState({ Descricao })}
                        />



                        <TouchableOpacity
                            style={styles.btnRegister}
                            onPress={this.postProjects}
                        >
                            <Image
                                source={require('../../assets/img/cadastro.png')}
                                style={styles.imgBtnRegister}
                            />

                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    mainHeader: {
        flex: .2,
        // backgroundColor: 'blue',
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
        marginLeft: 152
    },

    mainHeaderText: {
        fontSize: 20,
        color: '#561B75',
        fontFamily: 'Open Sans',
        marginLeft: 30,
        textDecorationLine: 'underline'
    },

    mainBody: {
        flex: 1,
        // backgroundColor: 'red'
    },

    contentInputs: {
        marginLeft: 30,
        marginRight: 30,
        // backgroundColor: 'green'
        
    },

    imgBtnRegister: {
        width: 20,
        height: 20

    },

    inputRegister: {
        width: '100%',
        marginBottom: 10,
        fontSize: 15,
        color: '#561B75',
        borderColor: '#B338F5',
        fontFamily: 'Open Sans',        
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10
        
    },

    btnRegister: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: '100%',
        backgroundColor: '#561B75',
        borderColor: '#8D2DC2',
        borderWidth: 1,
        borderRadius: 4,        
        marginTop: 30
    }

});