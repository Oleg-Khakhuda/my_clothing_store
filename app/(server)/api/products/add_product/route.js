const ADD_PRODUCT = process.env.ADD_PRODUCT

export async function POST(request) {
  try {
    console.log(process.env.NEXT_API_URL + ADD_PRODUCT)

    const res = await fetch(process.env.NEXT_API_URL + ADD_PRODUCT, request.formData, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const data = await res.json()
    console.log(data)

    return Response.json(data)
  } catch (error) {
    return console.log(error)
  }
}
