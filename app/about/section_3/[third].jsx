import { View, Text } from 'react-native'
import React from 'react'
import AboutAgency from "../../../components/AboutAgency"
import { useAuth } from '../../../service/authservice'

const Section_1 = () => {
     const {userData} = useAuth()
  return (
     <AboutAgency respuesta1={`Prefiero anticiparme a las necesidades del cliente en lugar de esperar a que solicite ayuda.`}
     respuesta2={`Asumo la responsabilidad de mis acciones y busco mejorar continuamente.`}
     respuesta3={`Puedo mantener la calma cuando enfrento desafíos o situaciones frustrantes en el trabajo.`}
     respuesta4={`Valoro la claridad al comunicarme con los clientes y me esfuerzo por ser entendido fácilmente.`}
     respuesta5={`Disfruto colaborar con otros miembros del equipo para alcanzar objetivos comunes.`} 
     respuesta6={`Planifico mi tiempo y organizo mis tareas para maximizar mi eficiencia.`}
     answer1={`I prefer to anticipate the customer's needs rather than waiting for them to ask for help.`}
     answer2={`I take responsibility for my actions and constantly seek to improve.`}
     answer3={`I can remain calm when facing challenges or frustrating situations at work.`}
     answer4={`I value clarity when communicating with customers and strive to be easily understood.`}
     answer5={`I enjoy collaborating with other team members to achieve common goals.`}
     answer6={`I plan my time and organize my tasks to maximize efficiency.`}
     nexRoute={`/about/behavior/intro`}/>

)
}

export default Section_1