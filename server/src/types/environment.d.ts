declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_SERVER: string;
      PORT: number;
    }
  }
}

export {};
