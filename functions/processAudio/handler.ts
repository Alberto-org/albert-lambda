import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { processAudioController } from "./controller";
import { logger } from "../../libs/utils";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "{}");
  logger.info(`Request body parsed: ${JSON.stringify(body)}`);
  return processAudioController(event);
};
