import * as express from 'express';
import onFinished from 'on-finished';

export const createHttpResponseLogger = (): express.RequestHandler => {
  return (request, response, next) => {
    onFinished(response, () => {
      console.log(
        'http.respond',
        `Responded to ${request.method} ${request.path} with ${response.statusCode}`
      );
    });

    next();
  };
};
