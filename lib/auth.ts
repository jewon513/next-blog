import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { USER_TOKEN, JWT_SECRET_KEY } from './constants'
import { jsonResponse } from './utils'
import type {NextApiRequest, NextApiResponse} from "next";
import { serialize } from 'cookie'

interface UserJwtPayload {
  jti: string
  iat: number
}

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth(request: NextApiRequest) {
  const token = request.cookies[USER_TOKEN]

  if (!token) {
    return jsonResponse(401, { error: { message: 'Missing user token' } })
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    )
    return verified.payload as UserJwtPayload
  } catch (err) {
    return jsonResponse(401, { error: { message: 'Your token has expired.' } })
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(
  request: NextApiRequest,
  response: NextApiResponse,
  payload: object
) {
  const cookie = request.cookies[USER_TOKEN]
  debugger
  if (!cookie) {
    const token = await new SignJWT({...payload})
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(JWT_SECRET_KEY))
    response.setHeader('Set-Cookie', serialize(USER_TOKEN, token, {httpOnly: true}))
    return token
  }
  return {}
}
