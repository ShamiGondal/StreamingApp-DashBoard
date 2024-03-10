
import { auth ,UserButton} from "@clerk/nextjs"
import Link from "next/link";
import { Button } from "../ui/button";

const ProfileMenu = () => {
    const {userId} = auth();
  return (
   <>
   {userId?(
   <div className="flex items-center justify-center gap-3">
    <UserButton  afterSignOutUrl="/"/>
    <Link href={"/dashboard?tab=Dash"}><Button>Dashborad</Button></Link></div> ):(<div className="btns">
       <Button size={"default"}><Link href={'/sign-in'} className="text-sm">Sign in</Link></Button>
      </div>
      )}
   </>
  )
}

export default ProfileMenu
