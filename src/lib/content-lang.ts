export function getContentLang() { return 'ko'; }
export function pick(obj: any, lang: string) { return obj?.[lang] ?? obj?.ko ?? ''; }
