import React, {useState,useEffect} from 'react';
import {View,Image,Text, TouchableOpacity, FlatList} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api'


export default function incidents(){

  const [incidents,setIncidents] = useState([]);
  const navegation = useNavigation();
  const [total, setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading, setLoading] = useState (false); 



  function navegateDatail(incident){
    navegation.navigate('Detail',{incident}); 
  }

  async function loadIncidents(){
    if (loading) {
      return; 
    }

    if (total > 0 && incidents.length === total){
      return;
    }
    setLoading(true);
    
    const response = await api.get('incidents',{
      params :{page}
    });

    setIncidents([...incidents,...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1)
    setLoading(false);

  }
  useEffect(()=>{
    loadIncidents();
  },[]);
 
  return(
    <View style ={styles.conteiner}>
      <View style ={styles.header} >
        <Image source ={logoImg} />
        <Text style = {styles.headerText}>
          Total de <Text style ={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style = {styles.title}> Bem vindo! </Text>
      <Text style = {styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
      

      <FlatList
      data={incidents}
      style = {styles.incidentsList}
      keyExtractor = {incident=> String(incident.id)}
      showsHorizontalScrollIndicator={false}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      renderItem = {({item : incident}) =>(
        
        <View style = {styles.incidents} >

           <Text style = {styles.incidentsProprety}>ONG</Text>
           <Text style = {styles.incidentsValue}>{incident.name} de {incident.city} {incident.uf}</Text>
           
           <Text style = {styles.incidentsProprety}>Caso</Text>
           <Text style = {styles.incidentsValue}>{incident.title}</Text>
           
           <Text style = {styles.incidentsProprety}>VALOR</Text>
           <Text style = {styles.incidentsValue}>{
           Intl.NumberFormat('pt-BR',{
             style:'currency',
              currency:'BRL'
              }).format(incident.value)}</Text>

           <TouchableOpacity style={styles.detailsButton} 
           onPress = {()=> navegateDatail(incident)}>
             <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
             <Feather name = 'arrow-right' size = {16} color = '#e02041'/>
           </TouchableOpacity>

        </View>
        )}
      />
      

         

      </View>
    

    


  );
}