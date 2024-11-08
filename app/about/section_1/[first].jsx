import { View, Text } from 'react-native'
import React from 'react'
import AboutAgency from "../../../components/AboutAgency"
import { useAuth } from '../../../service/authservice'

const Section_1 = () => {
     const {userData} = useAuth()
  return (
     <AboutAgency respuesta1={`Prefiero trabajar de forma independiente en lugar de en equipo.`}
     respuesta2={`Encuentro energizantes las interacciones sociales y las espero con entusiasmo.`}
     respuesta3={`Cuando trato con un cliente difícil, mantengo la calma y me enfoco en resolver su.`}
     respuesta4={`Presto mucha atención a los detalles para asegurar la precisión en mi trabajo.`}
     respuesta5={`Me siento cómodo manejando tareas e inquietudes repetitivas de los clientes.`} 
     respuesta6={`Me resulta fácil empatizar con los clientes y entender sus perspectivas.`}
     answer1={`I prefer working independently rather than in a team setting.`}
     answer2={`I find social interactions energizing and look forward to them.`}
     answer3={`When I encounter a difficult customer, I remain calm and focus on solving their issue effectively.`}
     answer4={`I pay close attention to details to ensure accuracy in my work.`}
     answer5={`I am comfortable handling repetitive tasks and inquiries from customers.`}
     answer6={`I find it easy to empathize with customers and understand their perspectives.`}
     nexRoute={`/about/section_2/id=ok90f-jdjid-s873f${userData?.id}-hg53df`}/>

)
}

export default Section_1