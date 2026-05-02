// src/app/api/bookings/route.js  (Simple Version)
export async function POST(req) {
  try {
    const body = await req.json();

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    console.log("Booking received:", body); // For testing

    return Response.json({
      success: true,
      message: "Booking confirmed successfully! 🎉"
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong"
    }, { status: 500 });
  }
}