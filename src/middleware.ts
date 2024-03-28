import { auth, authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


const checkAdmin = ():boolean=>{
  const {sessionClaims} = auth();
  
   if (sessionClaims?.metadata.role === "admin") {
    return true;
}
else{
  return false;
}
}



 

export default authMiddleware({

  

  publicRoutes: ['/'],
 
  ignoredRoutes: [""],
  
});
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

