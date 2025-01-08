import ListCategories from '@/app/components/ListCategories/ListCategories'
import ListProducts from '@/app/components/ListProducts/ListProducts'

const page = ({ params }) => {
  const { categorySlug: categorySlug } = params
  const { mainSlug: mainSlug } = params

  return (
    <>
      <ListCategories mainSlug={mainSlug} />
      <ListProducts categorySlug={categorySlug} />
    </>
  )
}

export default page
