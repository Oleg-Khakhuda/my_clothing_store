import Image from 'next/image'
import Logo from '../../../public/logo.webp'
import s from './Loader.module.scss'

export default function Loader() {
  return (
    <div className={s.logo}>
      <Image className={s.logoImg} src={Logo} alt="logo" width={250} height={250} priority={true} />
    </div>
  )
}
