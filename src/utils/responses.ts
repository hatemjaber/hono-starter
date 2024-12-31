import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export const notFoundResponse = (ctx: Context) => {
    return ctx.json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) }, StatusCodes.NOT_FOUND);
};

export const badRequestResponse = (ctx: Context, message: string) => {
    return ctx.json({ error: message }, StatusCodes.BAD_REQUEST);
};

export const unprocessableEntityResponse = (ctx: Context, message: string) => {
    return ctx.json({ error: message }, StatusCodes.UNPROCESSABLE_ENTITY);
};

export const internalServerErrorResponse = (ctx: Context, error: any) => {
    if (error instanceof HTTPException) {
        return ctx.json({ error: error.message }, error.status);
    }
    return ctx.json({ error }, StatusCodes.INTERNAL_SERVER_ERROR);
};

export const unauthorizedResponse = (ctx: Context, message: string) => {
    return ctx.json({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) }, StatusCodes.UNAUTHORIZED);
};

export const forbiddenResponse = (ctx: Context, message: string) => {
    return ctx.json({ error: getReasonPhrase(StatusCodes.FORBIDDEN) }, StatusCodes.FORBIDDEN);
};
