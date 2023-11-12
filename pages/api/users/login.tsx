import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ isSuccess: false });
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        isSuccess: false,
        error: "Email or password is incorrect",
      });
    }

    if (user) {
      req.session.user = {
        id: user.id,
      };
      await req.session.save();

      return res.json({ isSuccess: true, message: "logged in successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, error: "failed to log in" });
  }
}

export default withApiSession(
  withHandler({ method: "POST", handler, isPrivate: true })
);
