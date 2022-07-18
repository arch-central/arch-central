declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_HOST: string
      }
    }
  }
  
  export {}