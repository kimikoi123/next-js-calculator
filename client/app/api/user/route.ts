export async function GET(request: Request) {
    const data = await fetch('http://localhost:5000/app/user')

    return new Response('Goodbye, Next.js!')
}
