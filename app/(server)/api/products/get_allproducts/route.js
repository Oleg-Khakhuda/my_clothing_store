export const revalidate = 60

const FETCH_PRODUCTS = process.env.FETCH_PRODUCTS

export async function GET() {
  try {
    const res = await fetch(process.env.NEXT_API_URL + FETCH_PRODUCTS)
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return console.log(error)
  }
}
