import { SportDialogBox } from "@/components/custom/SportDialogueBox"
import GETSPORTS from "@/components/custom/GetSports"


const page = () => {
  return (
    <section className="leaguePage px-3 py-6 w-full">
     <div className="flex flex-col sm:flex-row items-center gap-4 justify-between ">
     <h4 className="title font-semibold text-2xl md:text-3xl ">SPORTS</h4>
       {<SportDialogBox></SportDialogBox>} 
     </div>
     {<GETSPORTS></GETSPORTS>}
    
    </section>
  )
}

export default page
