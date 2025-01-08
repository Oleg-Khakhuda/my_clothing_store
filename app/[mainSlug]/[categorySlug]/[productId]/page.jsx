import Product from '../../../components/Product/Product'

const page = async ({ params }) => {
  const productId = params.productId

  return <Product productId={productId} />
}

export default page
