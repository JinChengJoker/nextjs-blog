import {Session, withIronSession} from "next-iron-session";
import {NextApiRequest, NextApiResponse} from "next";

export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse,
) => void | Promise<void>;

export const ironSession = (handle: NextIronHandler) =>
  withIronSession(handle, {
    cookieName: "next_blog",
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  })