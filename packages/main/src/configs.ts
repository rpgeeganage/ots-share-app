import { z } from 'zod';

const envSchema = z.object({
  PURGE_TRIGGER_INTERVAL: z.string().default('60000').transform(Number),
});

const parsedConfig = envSchema.safeParse(process.env);
if (!parsedConfig.success) {
  throw new Error(`Configuration failuer. ${JSON.stringify(parsedConfig.error.format())}`);
}

export const Configs = parsedConfig.data;
export type ConfigsType = z.input<typeof envSchema>;
