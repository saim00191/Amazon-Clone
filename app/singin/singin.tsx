"use client";
import Image from "next/image";
import amazonlogo from "@/images/darkLogo.png";
import { FaCaretRight } from "react-icons/fa6";
import { ThreeCircles } from "react-loader-spinner";
import Link from "next/link";
import { useState } from "react";
import { app } from "@/firebse.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/Slice";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth(app);
  // State variables for email, password, and error messages
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errEmail, setErrEmail] = useState<string>("");
  const [userErrEmail, setUserErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [userErrPassword, setUserErrPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string>("");

  // Email validation regex
  const emailValidation = (email: string): boolean => {
    return (
      String(email)
        .toLowerCase()
        .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/) !== null
    );
  };

  // Handle changes in email input
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrEmail("");
    setUserErrEmail("");
    setErrMessage("");
  };

  // Handle changes in password input
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrPassword("");
    setUserErrPassword("");
    setErrMessage("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous messages
    setErrEmail("");
    setErrPassword("");
    setSuccessMsg("");

    // Validate email
    if (!email) {
      setErrEmail("Enter your email");
      return;
    }
    if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
      return;
    }

    // Validate password
    if (!password) {
      setErrPassword("Enter your password");
      return;
    }
    if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters.");
      return;
    }

    // Proceed with sign-in
    setLoading(true);
    if (emailValidation(email) && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              id: user.uid,
              userName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );

          setLoading(false);
          setSuccessMsg("Logged In Successfully!");
          // Redirect after a short delay
          setTimeout(() => {
            router.push("/");
          }, 2000);
          // ...
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          // Handle Errors here.
          if (errorCode === "auth/invalid-email") {
            setErrEmail("Invalid email");
          } else if (errorCode === "auth/wrong-password") {
            setErrPassword("Invalid password");
          } else if (errorCode === "auth/invalid-credential") {
            setErrMessage("Invalid Email and Password");
          }
        });
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-grow bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center">
          <Link href="/">
            <Image className="w-32 mb-4" src={amazonlogo} alt="amazonlogo" />
          </Link>
          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col items-start bg-white border border-zinc-200 rounded-md shadow-md p-6"
          >
            <h2 className="text-3xl font-medium mb-4">Sign In</h2>
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-1">
                  Email or mobile phone number
                </p>
                <input
                  type="email"
                  onChange={handleEmail}
                  value={email}
                  className="w-full text-sm bg-white outline-none lowercase border border-zinc-400 py-2 px-3 focus:border-yellow-500"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1">
                    <span className="italic font-extrabold">!</span>
                    {errEmail}
                  </p>
                )}
                {userErrEmail && (
                  <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1">
                    <span className="italic font-extrabold">!</span>
                    {userErrEmail}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-1">Password</p>
                <input
                  type="password"
                  onChange={handlePassword}
                  value={password}
                  className="w-full text-sm bg-white outline-none lowercase border border-zinc-400 py-2 px-3 focus:border-yellow-500"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1">
                    <span className="italic font-extrabold">!</span>
                    {errPassword}
                  </p>
                )}
                {userErrPassword && (
                  <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1">
                    <span className="italic font-extrabold">!</span>
                    {userErrPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-1.5 text-sm font-normal bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border mt-2 border-zinc-400"
              >
                Continue
              </button>
              {loading && (
                <div className="flex justify-center mt-1">
                  <ThreeCircles
                    visible={true}
                    height="50"
                    width="50"
                    color="#febd69"
                    ariaLabel="three-circles-loading"
                  />
                </div>
              )}
              {successMsg && (
                <div className="mt-1">
                  <p className="text-base text-green-500 border-[1px] border-green-500 text-center px-2 font-semibold py-1">
                    {successMsg}
                  </p>
                </div>
              )}
              {errMessage && (
                <div className="mt-1">
                  <p className="text-base text-red-500 border-[1px] border-red-500 text-center px-2 font-semibold py-1">
                    {errMessage}
                  </p>
                </div>
              )}
              <p className="text-[13px] text-black leading-4 mt-4 text-left">
                By continuing, you agree to Amazon's{" "}
                <span className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline">
                  Conditions of Use
                </span>{" "}
                and{" "}
                <span className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline">
                  Privacy Notice.
                </span>
              </p>
              <p className="flex gap-1 text-xs items-start cursor-pointer text-gray-700 justify-start">
                <FaCaretRight />
                <span className="hover:text-orange-700 text-blue-600 hover:underline">
                  Need help?
                </span>
              </p>
            </div>
            <p className="w-full text-xs mt-4 flex items-center justify-center">
              <span className="flex-grow h-[1px] bg-zinc-400"></span>
              <span className="mx-2 text-xs">New to Amazon</span>
              <span className="flex-grow h-[1px] bg-zinc-400"></span>
            </p>
            <Link className="w-full" href="/registration">
              <button className="w-full py-1.5 bg-gradient-to-t from-slate-200 to-slate-100 border border-zinc-400 mt-4 text-sm font-normal">
                Create your Amazon account
              </button>
            </Link>
          </form>
        </div>
      </div>

      <div className="h-[25vh] py-10 w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 items-center justify-start">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-700 hover:underline cursor-pointer duration-200">
            Conditions of use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-700 hover:underline cursor-pointer duration-200">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-700 hover:underline cursor-pointer duration-200">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default SignIn;
