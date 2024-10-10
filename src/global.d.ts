enum ResultCode {
  SUCCESS = 200,
  FAIL = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

type Result<T = unknown> = Promise<{
  msg: string
  data?: T
  code: ResultCode
  token?: string
}>

declare const GLOBAL_CONSTANT: string
