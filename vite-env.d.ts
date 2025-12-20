
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_EMAILJS_SERVICE_ID: string
    readonly VITE_EMAILJS_TEMPLATE_ID: string
    readonly VITE_EMAILJS_PUBLIC_KEY: string
    readonly VITE_CAL_LINK: string
    readonly VITE_GOOGLE_SHEET_SCRIPT_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}
