declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_SERVER: string;
      PORT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
