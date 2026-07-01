
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function GET(request) {
  try {
    return await handler.GET(request);
  } catch (error) {
    console.error("BETTER_AUTH_GET_ERROR:", error);
    return Response.json({
      error: error.message,
      stack: error.stack,
      message: "An error occurred in Better Auth GET handler."
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    return await handler.POST(request);
  } catch (error) {
    console.error("BETTER_AUTH_POST_ERROR:", error);
    return Response.json({
      error: error.message,
      stack: error.stack,
      message: "An error occurred in Better Auth POST handler."
    }, { status: 500 });
  }
}