import { View, Text } from 'react-native'
import React from 'react'
import AboutAgency from "../../../components/AboutAgency"
import { useAuth } from '../../../service/authservice'

const Section_1 = () => {
     const {userData} = useAuth()
  return (
     <AboutAgency respuesta1={`Soy flexible y puedo adaptarme a nuevos procesos o cambios en el lugar de trabajo.`}
     respuesta2={`Prefiero evitar los conflictos siempre que sea posible.`}
     respuesta3={`Asegurar la satisfacción del cliente es mi principal prioridad.`}
     respuesta4={`Prefiero instrucciones claras y estructura en mi trabajo.`}
     respuesta5={`Puedo manejar situaciones de estrés sin sentirme abrumado.`} 
     respuesta6={`Tengo ganas de aprender nuevas habilidades y mejorar continuamente en mi rol.`}
     answer1={`I am flexible and can adapt to new processes or changes in the workplace.`}
     answer2={`I prefer to avoid conflicts whenever possible.`}
     answer3={`Ensuring customer satisfaction is my top priority.`}
     answer4={`I can handle stressful situations without becoming overwhelmed.`}
     answer5={`I am eager to learn new skills and continuously improve in my role.`}
     answer6={`I prefer clear instructions and structure in my work.`}
     nexRoute={`/about/section_3/id=ok90f-jdjid-s873f${userData?.id}-hg53df`}/>

)
}

export default Section_1