const DELETE_PRODUCT = process.env.DELETE_PRODUCT

export async function DELETE(request, { params }) {
  try {
    const id = (await params).productId
    console.log(id)

    const res = await fetch(`${process.env.NEXT_API_URL}${DELETE_PRODUCT}${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    console.log(data)

    return Response.json(data)
  } catch (error) {
    return console.log(error)
  }
}
