import { IncomingMessage } from "http";
import { Session } from "koa-generic-session";

export type CreatedURLRequestBody = {
  url: string;
  expireDate: string;
};

export type IncomingMessageWithKoaSession = IncomingMessage & {
  session?: Session;
};
