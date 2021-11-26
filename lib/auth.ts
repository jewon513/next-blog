import { nanoid } from 'nanoid'
import { SignJWT, jwtVerify } from 'jose'
import { USER_TOKEN, JWT_SECRET_KEY } from './constants'
import type {NextApiRequest, NextApiResponse} from "next";
import { serialize } from 'cookie'

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth(request: NextApiRequest) {
  const token = request.cookies[USER_TOKEN]
  if (!token) {
    return {
      status: 401,
      error: {
        message: 'Missing user token'
      }
    }
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    )
    return verified.payload
  } catch (err) {
    return {
      status: 401,
      error: {
        message: 'Your token has expired.'
      }
    }
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(
  request: NextApiRequest,
  response: NextApiResponse,
  payload: any
) {
  const token = await new SignJWT({...payload})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(JWT_SECRET_KEY))
  response.setHeader('Set-Cookie', serialize(USER_TOKEN, token))
  return token
}
