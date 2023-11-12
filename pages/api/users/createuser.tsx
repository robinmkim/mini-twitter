import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, email, password, passwordConfirm } = req.body;
  console.log(req.body);
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ isSuccess: false, error: "Please fill every field" });
  }

  if (password !== passwordConfirm) {
    return res
      .status(400)
      .json({ isSuccess: false, error: "Password does not match" });
  }

  try {
    const existingUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        isSuccess: false,
        error: "An account with the email already exists",
      });
    }
    const user = await client.user.create({
      data: {
        email,
        password,
        name,
        avatar: "",
      },
    });

    return res.json({
      isSuccess: true,
      message: "An account has been created",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, error: "Failed to create an account" });
  }
}
export default withHandler({ method: "POST", handler, isPrivate: true });
