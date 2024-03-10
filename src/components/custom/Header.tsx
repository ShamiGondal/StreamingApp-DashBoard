import Link from "next/link"
import UserProfileMenu from "./ProfileMenu"


const Header = () => {
  return (
   <>
    <nav className='text-sm z-20 sticky top-0 left-0 px-3 py-2 flex gap-2 items-center justify-between bg-gray-50  border-slate-100 border-b-2'>
    <Link href="/"> <div className="logo">My app</div></Link>
      <UserProfileMenu></UserProfileMenu>
    </nav>
   </>
  )
}

export default Header
