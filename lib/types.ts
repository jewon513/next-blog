export type ApiState = "idle" | "loading" | "success" | "failure"

export type Code = 0 | 1

export type ApiResult<T> = {
  code: Code
  data: T
  message: string
}