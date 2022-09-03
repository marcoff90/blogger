export interface ErrorMessage {
  error: string
}

export interface CreateUserResponse {
  id: number,
  username: string
}

export interface LoginUserResponse {
  token: string,
  username: string,
  avatar: string
}

export interface ApiMessage {
  message: string
}

export interface ActivationResponse {
  username: string,
  active: boolean,
  avatar: string,
  token: string
}
