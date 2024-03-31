import AddGame from "@/components/custom/AddGame"
// import GetTeams from "@/components/custom/GetTeams"
import GetGames from "@/components/custom/GetGames"
const page = () => {
  return (
    <section className="leaguePage px-3 py-6 w-full">
     <div className="flex flex-col sm:flex-row items-center gap-4 justify-between ">
     <h4 className="title font-semibold text-2xl md:text-3xl ">GAME</h4>
      <AddGame></AddGame>
     </div>
     <GetGames></GetGames>
    </section>
  )
}

export default page
