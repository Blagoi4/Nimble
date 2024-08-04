// / <reference types="vite/client" />
declare module '*.svg' {
  const content: any;
  export default content;
  export const ReactComponent: any;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
