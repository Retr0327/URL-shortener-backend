import { Next } from "koa";
import { SchemaOf } from "yup";
import { RouterContext } from "@koa/router";

/**
 * Validate post data or query strings based on the Yup`schema`.
 * @param {SchemaOf<T>} schema - the Yup schema
 * @returns a Koa middleware.
 **/

function validate<T>(schema: SchemaOf<T>) {
  return async (ctx: RouterContext, next: Next) => {
    try {
      await schema.validate(ctx.request.body);
      return next();
    } catch (error) {
      ctx.status = 422;
      ctx.body = { status: "failed", msg: "invalid request body" };
    }
  };
}

export default validate;
