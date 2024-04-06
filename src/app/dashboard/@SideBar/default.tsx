
'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation"

import Link from 'next/link'

const sideBarsArr = [
    {id:1,tab:'Dash',link:"/dashboard/Dash"},
    {id:2,tab:'Games',link:"/dashboard/Game"},
    {id:4,tab:"Leagues",link:"/dashboard/league"},
    {id:5,tab:'Admin',link:"/dashboard/Adm"},
    {id:6,tab:'Sports',link:"/dashboard/sports"},
    {id:7,tab:'Teams',link:"/dashboard/Teams"},
]

export default function SideBar() {
  const pathname = usePathname();
  
  
  
  
  return (
    <ScrollArea className="h-72 md:min-h-screen w-full rounded-md border-2 border-gray-300 relative z-3">
      <div className="px-4 py-12 flex flex-col gap-5">
        {sideBarsArr.map((item) => (
            <Link   className={`px-3 py-2 border-2 border-gray-200 rounded-sm ${pathname.toLowerCase()===item.link.toLowerCase()?"bg-black text-white":""}`} href={`${item.link}`} 
            key={item.id}>
              {item.tab}
            </Link>
        ))}
      </div>
    </ScrollArea>
  )
}
