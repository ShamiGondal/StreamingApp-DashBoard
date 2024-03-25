
import { LeagueDialogBox } from "@/components/custom/LeagueDialogueBox"
import GetLeagues from "@/components/custom/GetLeagues"


const page = () => {
  return (
    <section className="leaguePage px-3 py-6 w-full">
     <div className="flex flex-col sm:flex-row items-center gap-4 justify-between ">
     <h4 className="title font-semibold text-2xl md:text-3xl ">LEAGUES</h4>
       {<LeagueDialogBox></LeagueDialogBox>} 
     </div>
        <GetLeagues></GetLeagues> 
    </section>
  )
}

export default page