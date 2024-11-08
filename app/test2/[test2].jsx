import { View, Text } from "react-native";
import React from "react";
import Assessment from "../../components/Assessment";
import { agent, agente } from "../../constants/agenService";
import { useAuth } from "../../service/authservice";

const Avaluetion = () => {
  const {userData} = useAuth()
  return (
    <Assessment
    videoEnUrl='../../assets/video/customer2.mp4'
    videoEsUrl='../../assets/video/cliente2.mp4'
      question={agent.question2}
      pregunta={agente.pregunta2}
      answer1={agent.secondeQuestionRes1}
      respuesta1={agente.segundaPreguntaRes1}
      answer2={agent.secondeQuestionRes2}
      respuesta2={agente.segundaPreguntaRes2}
      answer3={agent.secondeQuestionRes3}
      respuesta3={agente.segundaPreguntaRes3}
      nexRoute={`/test3/id=ok90f-jdjid-s873f${userData?.id}-hg53df`}
    />
  );
};

export default Avaluetion;
