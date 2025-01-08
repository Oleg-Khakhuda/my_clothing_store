export const revalidate = 60

const FETCH_CATEGORY = process.env.FETCH_CATEGORY

export async function GET(request, { params }) {
  try {
    const slug = (await params).mainSlug
    const res = await fetch(`${process.env.NEXT_API_URL}${FETCH_CATEGORY}${slug}`)
    const data = await res.json()

    return Response.json(data)
  } catch (error) {
    return console.log(error)
  }
}
