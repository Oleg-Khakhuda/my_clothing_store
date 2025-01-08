const FETCH_PRODUCT_BY_ID = process.env.FETCH_PRODUCT_BY_ID

export async function GET(request, { params }) {
  try {
    const id = (await params).productId

    const res = await fetch(`${process.env.NEXT_API_URL}${FETCH_PRODUCT_BY_ID}${id}`)

    const data = await res.json()

    return Response.json(data)
  } catch (error) {
    console.log(error)
  }
}
