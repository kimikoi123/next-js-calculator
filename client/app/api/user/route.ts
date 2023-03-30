export async function POST(request: Request) {
  try {
    console.log(request)
    const data = await fetch("http://localhost:5000/app/user")

    return new Response("Goodbye, Next.js!")
  } catch (error) {
    console.log(error)
  }
}
