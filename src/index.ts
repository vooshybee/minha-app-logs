import express, { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { collectMetricsMiddleware, metricsEndpoint } from './metrics';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware de logs
app.use((req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    logger.info('Requisição recebida', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode
    });
  });
  next();
});

// Middleware de métricas
app.use(collectMetricsMiddleware);

// Rotas
app.get('/', (_req: Request, res: Response) => {
  res.send('OK');
});

// Endpoint de métricas Prometheus
app.get('/metrics', metricsEndpoint);

app.listen(PORT, () => {
  logger.info('Servidor iniciando', { port: PORT });
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
