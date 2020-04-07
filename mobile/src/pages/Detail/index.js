import React from 'react';
import {View, Image,Text,TouchableOpacity,Linking} from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailCompose from 'expo-mail-composer';


export default function Detail(){

  const route = useRoute();
  const incident = route.params.incident;
  const navegation = useNavigation();
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}`

  function navegateBack(){
    navegation.goBack()
  }

  function sendMail(){
    MailCompose.composeAsync({
      subject:`Heroi do caso : ${incident.title}`,
      recipients:[incident.email],
      body :  message,
      })
   }

  function sendWhatsApp(){
    Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`);

  }

   return(
     <View style = {styles.conteiner}>

       <View style ={styles.header} >
        <Image source ={logoImg} />

        <TouchableOpacity onPress =  {navegateBack}>
          <Feather name = 'arrow-left' size ={28} color='#e82041'/>
        </TouchableOpacity>

      </View>
  

        <View style= {styles.incident}>
          <Text style = {styles.incidentsProprety, {marginTop: 0 }}>ONG</Text>
          <Text style = {styles.incidentsValue}>{incident.name} de {incident.city} {incident.uf}</Text>
          
          <Text style = {styles.incidentsProprety}>Caso</Text>
   <Text style = {styles.incidentsValue}>{incident.title}</Text>
          
          <Text style = {styles.incidentsProprety}>VALOR</Text>
          <Text style = {styles.incidentsValue}>{
           Intl.NumberFormat('pt-BR',{
             style:'currency',
              currency:'BRL'
              }).format(incident.value)}</Text>
          </View>

          <View style= {styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
            <Text style={styles.heroDescription}>Entre em contato</Text>
            
            <View style={styles.actions}>
              <TouchableOpacity style = {styles.action} onPress={sendWhatsApp}>
                <Text style ={styles.actionText}>WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.action} onPress={sendMail}>
                <Text style ={styles.actionText}>E-mail</Text>
              </TouchableOpacity>
            </View>

          </View>


     </View>
   )
}