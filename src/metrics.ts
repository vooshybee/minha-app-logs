import { Counter, collectDefaultMetrics, Registry } from 'prom-client';
import { Request, Response, NextFunction } from 'express';

const register = new Registry();
collectDefaultMetrics({ register });

const httpRequests = new Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequests);

export function collectMetricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on('finish', () => {
    httpRequests.inc({
      method: req.method,
      route: req.route?.path ?? req.path,
      status_code: res.statusCode.toString()
    });
  });
  next();
}

export async function metricsEndpoint(
  _req: Request,
  res: Response
) {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
}