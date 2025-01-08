export const revalidate = 60

const FETCH_PRODUCTS_BY_MAINCAT = process.env.FETCH_PRODUCTS_BY_MAINCAT

export async function GET(request, { params }) {
  try {
    const slug = (await params).mainSlug
    const res = await fetch(`${process.env.NEXT_API_URL}${FETCH_PRODUCTS_BY_MAINCAT}${slug}`)

    const data = await res.json()

    return Response.json(data)
  } catch (error) {
    return console.log(error)
  }
}
