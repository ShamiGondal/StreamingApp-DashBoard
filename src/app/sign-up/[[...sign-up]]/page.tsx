import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center p-5">

        <SignUp redirectUrl={"/"}></SignUp>
    </div>
  )
}

export default SignUpPage

