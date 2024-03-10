
export default function DashBoardLayout({children,SideBar}:{children:React.ReactNode;SideBar:React.ReactNode}){
return (
<section className="flex flex-col md:flex-row">
<div className="sidebar md:flex-1">
    {SideBar}
</div>
<main className="children md:flex-[2.2] lg:flex-[3]">
    {children}
</main>
</section>)

}