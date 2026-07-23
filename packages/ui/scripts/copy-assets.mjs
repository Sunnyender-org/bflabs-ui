import { copyFile, mkdir } from 'node:fs/promises'

await mkdir('dist', { recursive: true })
await copyFile('src/styles/tokens.css', 'dist/tokens.css')

