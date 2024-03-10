
'use client'
import { ScrollArea } from "@/components/ui/scroll-area"

import Link from 'next/link'
import {  useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"


const sideBarsArr = [
    {id:1,tab:'DashBoard'},
    {id:2,tab:'Games'},
    {id:3 ,tab:'Players'},
    {id:4,tab:"User"},
    {id:5,tab:'Admin'}
]

export default function SideBar() {

  const searchParams = useSearchParams()
  const searchTab = searchParams.get('tab')
  const pathname = usePathname()
  console.log(pathname);
  return (
    <ScrollArea className="h-72 md:min-h-screen w-full rounded-md border-2 border-red-300">
      <div className="px-4 py-12 flex flex-col gap-5">
        {sideBarsArr.map((item) => (
            <Link   className={`p-2 border-2 border-gray-700 rounded-xl ${searchTab?.toLowerCase()===item.tab.toLowerCase() ? "bg-slate-700 text-white":""}`} href={`/dashboard/${item.tab}`} 
            key={item.id}>
              {item.tab}
            </Link>
        ))}
      </div>
    </ScrollArea>
  )
}
