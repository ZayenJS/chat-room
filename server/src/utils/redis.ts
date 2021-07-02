import { ClientOpts, createClient, RedisClient } from 'redis';

export class Redis extends RedisClient {
  private static redis = createClient();
  constructor(options: ClientOpts) {
    super(options);
  }
  public static async asyncGet(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.redis.get(key, (err, data) => {
        if (err) return reject(err);

        return resolve(data);
      });
    });
  }
}
