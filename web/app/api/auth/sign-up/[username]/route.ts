import { isUsernameAvailable } from "@/lib/queries/profile";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  username: string;
};
export const GET = async (req: NextRequest, context: { params: Params }) => {
  const { username } = context.params;

  if (!username) {
    return NextResponse.json(
      {
        message: "Username is required",
      },
      { status: 400 },
    );
  }

  const result = await isUsernameAvailable(username);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result, { status: 200 });
};
