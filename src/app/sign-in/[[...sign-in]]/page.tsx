import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center p-5">
        <SignIn redirectUrl="/"></SignIn>
    </div>
  )
}

export default SignInPage

