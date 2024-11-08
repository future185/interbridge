import { View, Text } from "react-native";
import React from "react";
import Assessment from "../../components/Assessment";
import { agent, agente } from "../../constants/agenService";
import { useAuth } from "../../service/authservice";

const Avaluetion = () => {

  const {userData} = useAuth()
  return (
    <Assessment
      videoEnUrl="../../assets/video/customer1.mp4"
      videoEsUrl="../../assets/video/clienteuno.mp4"
      question={agent.question1}
      pregunta={agente.pregunta1}
      answer1={agent.firstQuestionRes1}
      respuesta1={agente.primeraPreguntaRes1}
      answer2={agent.firstQuestionRes2}
      respuesta2={agente.primeraPreguntaRes2}
      answer3={agent.firstQuestionRes3}
      respuesta3={agente.primeraPreguntaRes3}
      nexRoute={`/test2/id=ok90f-76783cgg-jdjks-d-s873f${userData?.id}-hdhh76s`}
    />
  );
};

export default Avaluetion;
