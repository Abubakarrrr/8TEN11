import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth } from "@/utils/firebaseConfig";
import { useAuthStore } from "@/store/authStore";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const LoginWithGoogle = () => {
  const { loginWithGoogle, error, isLoading } = useAuthStore();
  const [isrequesting, setIsrequesting] = useState(false);
  const navigate = useNavigate();

  const handleLoginWithGooggle = async () => {
    setIsrequesting(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(firebaseAuth, provider);
      if (user) {
        await loginWithGoogle(user);
        
        if (error) {
          console.log(error);
        } else {
          navigate("/");
        }
      }
      setIsrequesting(false);
    } catch (error) {
      setIsrequesting(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full h-[400px]">
      <div className="flex flex-col gap-4 justify-center items-center">
        <FcGoogle className="h-28 w-32" />
        <Button
          onClick={handleLoginWithGooggle}
          className=" bg-[#FFC107] hover:bg-[#FFCA28] py-6 px-6 text-white text-lg"
          disabled={isLoading || isrequesting}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginWithGoogle;
