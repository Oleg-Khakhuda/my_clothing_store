export const revalidate = 60

const FETCH_PRODUCTS_BY_CAT = process.env.FETCH_PRODUCTS_BY_CAT

export async function GET(request, { params }) {
  try {
    const slug = (await params).categorySlug
    const res = await fetch(`${process.env.NEXT_API_URL}${FETCH_PRODUCTS_BY_CAT}${slug}`)

    const data = await res.json()

    return Response.json(data)
  } catch (error) {
    return console.log(error)
  }
}
