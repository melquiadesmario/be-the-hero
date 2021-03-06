import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import * as MailCompose from 'expo-mail-composer'

import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Detail(){
    const navigation = useNavigation()
    const route = useRoute()

    const incident = route.params.incident
    const message = `Hello ${ incident.name }, I"m getting in touch because I would like to help in the case "${ incident.title}" with the value of ${ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value) }`
    
    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailCompose.composeAsync({
            subject: `Hero case: ${ incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${ incident.whatsapp}&text=${ message }`)
    }

    return(
        <View style={ styles.container }>
            <View style={ styles.header }>
                <Image source={ logoImg } />
                <TouchableOpacity onPress={ navigateBack }>
                    <Feather name='arrow-left' size={ 28 } color='#e82041' />
                </TouchableOpacity>
            </View>

            <View style={ styles.incident }>
                <Text style={ [styles.incidentProperty, { marginTop: 0 }] }>NGO:</Text>
                <Text style={ styles.incidentValue }>{ incident.name} of { incident.city} - { incident.uf }</Text>

                <Text style={ styles.incidentProperty }>CASE:</Text>
                <Text style={ styles.incidentValue }>{ incident.title}</Text>

                <Text style={ styles.incidentProperty }>Value:</Text>
                <Text style={ styles.incidentValue }>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</Text>
            </View>

            <View style={ styles.contactBox}>
                <Text style={ styles.heroTitle}>Save the day!</Text>
                <Text style={ styles.heroTitle}>Be the hero of this case.</Text>
                <Text style={ styles.heroDescription}>Contact us:</Text>
                
                <View style={ styles.actions}>
                    <TouchableOpacity style={ styles.action} onPress={ sendWhatsapp }>
                        <Text style={ styles.actionText }>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.action} onPress={ sendMail }>
                        <Text style={ styles.actionText }>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
