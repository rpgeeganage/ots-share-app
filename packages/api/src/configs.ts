import { Strategy } from '@ots-share/repository';
import { z } from 'zod';

const envSchema = z.object({
  DB_URL: z
    .string()
    .min(10)
    .default(<string>process.env.MONGO_URL),
  DB_TYPE: z.string().default(Strategy.DbTypeEnum.mongo),
});

const parsedConfig = envSchema.safeParse(process.env);
if (!parsedConfig.success) {
  throw new Error(`Configuration failuer. ${JSON.stringify(parsedConfig.error.format())}`);
}

export const Configs = parsedConfig.data;
export type ConfigsType = z.input<typeof envSchema>;
