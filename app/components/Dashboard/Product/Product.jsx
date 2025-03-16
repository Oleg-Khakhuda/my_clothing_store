'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { addProductThunk, updateProductThunk, removeProductThunk } from '@/app/redux/features/products/thunks'
import { useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { IoAddCircleOutline } from 'react-icons/io5'
import { RxUpdate } from 'react-icons/rx'
import Image from 'next/image'
import s from './Product.module.scss'
import { ModalProduct } from '../../utils/ModalProduct/ModalProduct'
import Loader from '../../Loader/Loader'

import { useModalConfirm } from '../../hooks/useModalConfirm'
import { ModalConfirm } from '../../utils/ModalConfirmation/ModalConfirm'

export const Product = () => {
  const products = useAppSelector(state => state.products.items)
  const isLoading = useAppSelector(state => state.products.isLoading)

  const dispatch = useAppDispatch()

  const { isModalConfirmOpen, openConfirmModal, closeConfirmModal, handleConfirm } = useModalConfirm()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [productData, setProductData] = useState({})

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleAddProduct = () => {
    setIsEditing(false)
    setProductData({
      mainCategory: '',
      category: '',
      name: '',
      description: '',
      sizeList: [],
      color: '',
      quantity: '',
      price: '',
      productImage: [],
    })
    toggleModal()
  }

  const handleEditProduct = product => {
    setIsEditing(true)
    setProductData(product)
    toggleModal()
  }

  const handleDeleteProduct = productId => {
    openConfirmModal(() => {
      dispatch(removeProductThunk(productId))
    })
  }

  const handleSubmit = (id, formData) => {
    if (isEditing) {
      dispatch(updateProductThunk({ id: id, formData }))
    } else {
      dispatch(addProductThunk(formData))
    }
  }

  // Expected server HTML to contain a matching <div> in <div>. Error Component Stack

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <button type="button" onClick={handleAddProduct}>
        Додати продукт
        <span>
          <IoAddCircleOutline />
        </span>
      </button>

      <ModalProduct
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSubmit={handleSubmit}
        productData={productData}
        isEditing={isEditing}
      />

      <ModalConfirm
        isModalConfirmOpen={isModalConfirmOpen}
        handleConfirm={handleConfirm}
        closeConfirmModal={closeConfirmModal}
      />

      {isLoading && <Loader />}

      {products && (
        <div>
          <table className="table productTable">
            <thead>
              <tr>
                <th scope="col">Фото</th>
                <th scope="col">Назва</th>
                <th scope="col">Ціна</th>
                <th scope="col">Оновити</th>
                <th scope="col">Видалити</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map(product => (
                  <tr key={product.id}>
                    <th scope="row">
                      <Image
                        className={s.image}
                        src={product?.image[0]?.url}
                        alt="product"
                        width="20"
                        height="20"
                        sizes="100vw"
                        priority={true}
                      />
                    </th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button type="button" className={s.button} onClick={() => handleEditProduct(product)}>
                        <RxUpdate />
                      </button>
                    </td>
                    <td>
                      <button type="button" className={s.button} onClick={() => handleDeleteProduct(product.id)}>
                        <RiDeleteBin2Line />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
