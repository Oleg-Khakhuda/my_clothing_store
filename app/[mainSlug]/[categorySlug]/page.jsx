import ListCategories from '@/app/components/ListCategories/ListCategories'
import ListProducts from '@/app/components/ListProducts/ListProducts'

const page = ({ params }) => {
  const { categorySlug: categorySlug } = params
  const { mainSlug: mainSlug } = params
  // console.log('categorySlug', categorySlug)
  console.log('mainSlug', mainSlug)

  return (
    <>
      <ListCategories mainSlug={mainSlug} />
      <ListProducts categorySlug={categorySlug} />
    </>
  )
}

export default page
