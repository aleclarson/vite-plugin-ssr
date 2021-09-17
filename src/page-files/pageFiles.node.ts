// Vite resolves globs with micromatch: https://github.com/micromatch/micromatch
// Pattern `*([a-zA-Z0-9])` is an Extglob: https://github.com/micromatch/micromatch#extglobs
export const pageFiles = {
  //@ts-ignore
  '.page': import.meta.glob('/pages/**/*.page.*([a-zA-Z0-9])'),
  //@ts-ignore
  '.page.client': import.meta.glob('/pages/**/*.page.client.*([a-zA-Z0-9])'),
  //@ts-ignore
  '.page.server': import.meta.glob('/pages/**/*.page.server.*([a-zA-Z0-9])'),
  //@ts-ignore
  '.page.route': import.meta.glob('/pages/**/*.page.route.*([a-zA-Z0-9])')
}
