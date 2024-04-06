import { TeamDialogueBox } from "@/components/custom/TeamDialogueBox"
import GetTeams from "@/components/custom/GetTeams"

const page = () => {
  return (
    <section className="leaguePage px-3 py-6 w-full">
     <div className="flex flex-col sm:flex-row items-center gap-4 justify-between ">
     <h4 className="title font-semibold text-2xl md:text-3xl ">TEAMS</h4>
        <TeamDialogueBox></TeamDialogueBox>
     </div>
     
      <GetTeams></GetTeams>
    </section>
  )
}

export default page
