import { Middleware } from "../../presentation/protocols/middleware/middleware";
import { Request, Response, NextFunction } from "express";
import { HttpRequest } from "../../presentation/protocols/http/http";

export const adapterMiddleWare = (middleWare: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
    };
    const httpResponse = await middleWare.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
