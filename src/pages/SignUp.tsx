import AuthBoard from "../components/Auth/AuthBoard";
import Logo from "../components/Auth/Logo";
import SignUp from "../components/Auth/SignUp";

export default function SignUpPage() {
  return (
    <>
      <AuthBoard>
        <header>
          <Logo />
        </header>
        <SignUp />
      </AuthBoard>
    </>
  );
}
