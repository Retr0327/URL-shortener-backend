import { IncomingMessage } from "http";
import { Session } from "koa-generic-session";

export type ShortURLResult = {
  id: string;
  full_url: string;
  short_url: string;
  created_at: Date;
  expire: Date;
};

export type CreatedURLRequestBody = {
  url: string;
  expireDate: string;
};

export type IncomingMessageWithKoaSession = IncomingMessage & {
  session?: Session;
};
