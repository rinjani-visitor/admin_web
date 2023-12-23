import { Eye } from '@phosphor-icons/react/dist/ssr'
import Link from "next/link"

const DetailPayment = ({ paymentId }) => {
  return (
    <Link href={`/dashboard/payment/${paymentId}`} className='btn btn-warning aspect-square p-0 btn-sm items-center'>
      <Eye size={24} color="#232323" />
    </Link>
  )
}

export default DetailPayment