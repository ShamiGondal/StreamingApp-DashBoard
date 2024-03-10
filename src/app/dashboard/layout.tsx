import { isAdmin } from "../utils/Admin";

export default function DashBoardLayout({children,SideBar,Main}:{children:React.ReactNode;SideBar:React.ReactNode,Main:React.ReactNode}){
   if(!(isAdmin())){
    return <div><p>Your are not admin</p></div>
   }
   
   return (
<>
<section className="flex flex-col md:flex-row">
<aside className="sidebar md:flex-1">
    {SideBar}
</aside>
<main className="md:flex-[2.2] lg:flex-[3] min-h-56 flex justify-center align-center">
    {Main}
</main>
</section>  
<section className="dshboard-footer">
    {children}
</section>
</>

    
)

}