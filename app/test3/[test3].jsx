import { View, Text } from "react-native";
import React from "react";
import Assessment from "../../components/Assessment";
import { agent, agente } from "../../constants/agenService";
import { useAuth } from "../../service/authservice";

const Avaluetion = () => {
  const { userData } = useAuth();
  return (
    <Assessment
      videoEnUrl="../../assets/video/customer3.mp4"
      videoEsUrl="../../assets/video/cliente3.mp4"
      question={agent.question3}
      pregunta={agente.pregunta3}
      answer1={agent.thirdQuestionRes1}
      respuesta1={agente.terceraPreguntaRes1}
      answer2={agent.thirdQuestionRes2}
      respuesta2={agente.terceraPreguntaRes2}
      answer3={agent.thirdQuestionRes3}
      respuesta3={agente.terceraPreguntaRes3}
      nexRoute={`/about/agency/let-us-know-about-you-${userData?.id}-iue7366-jjdh9-${userData?.created_at}+=jd87nnxu6-jdkjd-87bn`}
    />
  );
};

export default Avaluetion;
