import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Keyboard, SafeAreaView } from "react-native";
import { api } from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef('');

  async function buscar(){
    if(cep == ''){
      alert('Digite um CEP válido');
      setCep('');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();

    }catch(error){
      console.log('ERROR: ' + error)
    }
   
  }

  function limpar(){
    setCep('');
    inputRef.current.focus();
  }

  return(
    <View style={styles.container}>
      <View style={styles.areaEntrada}>
        <Text style={styles.titulo}> Digite o CEP desejado </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 40255265"
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity 
          style={styles.btn}
          onPress={ buscar }
        >
          <Text style={styles.btnTXT}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnClean}
          onPress={ limpar }
        >
          <Text style={styles.btnTXT}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepUser && 
        <View style={styles.areaSaida}>
          <Text style={styles.resultado}>CEP: {cepUser.cep}</Text>
          <Text style={styles.resultado}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.resultado}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.resultado}>Estado: {cepUser.uf}</Text>
        </View>
      
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    paddingTop: 40,
    alignItems: 'center',
  },
  areaEntrada: {
    alignItems: 'center',
    width: '100%'
  },
  titulo: {
    color: '#fdfdfd', 
    fontSize: 28, 
    fontWeight: 'bold',
    marginVertical: 25
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    width: '90%',
    borderRadius: 5,
    padding: 10,
    fontSize: 16
  },
  areaBtn: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  btn: {
    backgroundColor: '#5EC0AC',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: '45%'
    },
    btnClean: {
    backgroundColor: '#3579BE',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: '45%'
    },
    btnTXT: {
      color: '#fdfdfd',
      fontSize: 18,
    },
    areaSaida: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultado: {
      fontSize: 22,
      color: '#fdfdfd'
    }
});
