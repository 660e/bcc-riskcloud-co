declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
}

declare module '*.svg' {
  const content: any;
  export default content;
}

export {};
