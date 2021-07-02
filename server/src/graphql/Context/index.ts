import { Response } from 'express';
import { RedisClient } from 'redis';
import { EnhancedRequest } from '../../@types/EnhancedRequest';

export interface Context {
  req: EnhancedRequest;
  res: Response;
  redis: RedisClient;
}
