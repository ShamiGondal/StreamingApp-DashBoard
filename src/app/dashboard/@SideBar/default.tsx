
'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation"

import Link from 'next/link'

const sideBarsArr = [
    {id:1,tab:'Dash',link:"/dashboard/Dash"},
    {id:2,tab:'Games',link:"/dashboard/Game"},
    {id:3 ,tab:'Players',link:"/dashboard/Player"},
    {id:4,tab:"Users",link:"/dashboard/User"},
    {id:5,tab:'Admin',link:"/dashboard/Adm"},
    {id:6,tab:'Leagues',link:"/dashboard/League"},
]

export default function SideBar() {
  const pathname = usePathname();
  
  
  
  
  
  return (
    <ScrollArea className="h-72 md:min-h-screen w-full rounded-md border-2 border-gray-200 bg-slate-900">
      <div className="px-4 py-12 flex flex-col gap-5">
        {sideBarsArr.map((item) => (
            <Link   className={`px-2 py-4 ${pathname.toLowerCase()===item.link.toLowerCase()?"bg-black text-white":""}`} href={`${item.link}`} 
            key={item.id}>
              {item.tab}
            </Link>
        ))}
      </div>
    </ScrollArea>
  )
}
