const idChars: string = 'ABCDEFGHJKMNPQRSTUVWXYZ'

export function shortId(): string {
  const now: Date = new Date()
  let id = now.getUTCFullYear().toString()
  id += now.getUTCMonth().toString().padStart(2, '0')
  id += now.getUTCDay().toString().padStart(2, '0')
  for (let i = 0; i < 6; i++) id += idChars[Math.floor(Math.random() * idChars.length)]
  return id
}