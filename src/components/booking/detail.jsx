import { Eye } from '@phosphor-icons/react/dist/ssr'
import Link from "next/link"

const DetailBooking = ({ bookingId }) => {
  return (
    <Link href={`/dashboard/booking/${bookingId}`} className='btn btn-warning aspect-square p-0 btn-sm items-center'>
      <Eye size={24} color="#232323" />
    </Link>
  )
}

export default DetailBooking