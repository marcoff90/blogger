export interface RegisterServerInput {
  url: string,
  description: string,
  name: string,
  apis: Path[]
}

export interface Path {
  path: string
}
