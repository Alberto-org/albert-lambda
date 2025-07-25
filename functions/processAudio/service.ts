import { APIGatewayProxyEvent } from "aws-lambda";

export const transcribeAudio = async (
  event: APIGatewayProxyEvent
): Promise<{ message: string }> => {
  // Aquí va tu lógica real de transcripción
  return {
    message: "Audio procesado correctamente",
  };
};
