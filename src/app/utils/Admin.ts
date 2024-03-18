
import { auth } from "@clerk/nextjs";
const { sessionClaims } = auth();
export  function isAdmin(){ 
    return sessionClaims?.metadata.role === "admin"
}