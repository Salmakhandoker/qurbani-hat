import clientPromise from "@/lib/mongodb";

export async function PUT(req) {
  try {
    const { email, name, photo } = await req.json();

    const client = await clientPromise;
    const db = client.db("qurbanihat");

    await db.collection("users").updateOne(
      { email },
      { $set: { name, photo } }
    );

    const updatedUser = await db
      .collection("users")
      .findOne({ email });

    const { password, ...safeUser } = updatedUser;

    return Response.json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}