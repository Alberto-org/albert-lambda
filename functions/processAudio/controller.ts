import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { transcribeAudio } from "./service";
import { AppError, extractErrorMessage } from "../../libs/utils";

export const processAudioController = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const result = await transcribeAudio(event);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err: unknown) {
    if (err instanceof AppError) {
      return {
        statusCode: err.statusCode,
        body: JSON.stringify({ error: err.message }),
      };
    }
    const message = extractErrorMessage(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};
