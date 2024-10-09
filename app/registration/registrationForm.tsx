"use client";
import Image from "next/image";
import { FaCaretRight } from "react-icons/fa6";
import Link from "next/link";
import { ThreeCircles } from "react-loader-spinner";
import amazonlogo from "@/images/darkLogo.png";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "@/firebse.config";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const router = useRouter();
  const auth = getAuth(app);

  // State variables for user input and error messages
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const [errUsername, setErrUserName] = useState<string>("");
  const [errEmail, setErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [errConfirmPassword, setErrConfirmPassword] = useState<string>("");
  const [errFirebase, setErrFirebase] = useState<string>("");

  // Effect to manage loading state based on success message
  useEffect(() => {
    if (successMsg) {
      setLoading(false); // Stop loading when success message is set
    }
  }, [successMsg]);

  // Handlers for input changes
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
    setErrUserName("");
  };

  const emailValidation = (email: string): boolean => {
    // Simple regex for email validation
    return (
      String(email)
        .toLowerCase()
        .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/) !== null
    );
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    setErrEmail("");
    setErrFirebase("");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
    setErrConfirmPassword("");
  };

  // Main registration handler
  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous error messages
    setErrUserName("");
    setErrEmail("");
    setErrPassword("");
    setErrConfirmPassword("");
    setErrFirebase("");

    let hasError = false;

    // Validate userName
    if (!userName) {
      setErrUserName("Enter your name");
      hasError = true;
    } else if (userName.length > 15) {
      setErrUserName("Name should not exceed 15 characters.");
      hasError = true;
    }
    
    // Validate email
    if (!email) {
      setErrEmail("Enter your email");
      hasError = true;
    } else if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
      hasError = true;
    } else if (email.length > 25) {
      setErrEmail("Email should not exceed 25 characters."); // Corrected length
      hasError = true;
    }
    
    // Validate password
    if (!password) {
      setErrPassword("Enter your password");
      hasError = true;
    } else if (password.length < 7) {
      setErrPassword("Passwords must be at least 7 characters."); // Corrected minimum length
      hasError = true;
    } else if (password.length > 15) { // Corrected maximum length
      setErrPassword("Passwords must not exceed 15 characters.");
      hasError = true;
    }
    
    // Validate confirmPassword
    if (!confirmPassword) {
      setErrConfirmPassword("Enter your Confirm password");
      hasError = true;
    } else if (confirmPassword.length < 7) {
      setErrConfirmPassword("Passwords must be at least 7 characters."); // Corrected minimum length
      hasError = true;
    } else if (confirmPassword.length > 15) { // Corrected maximum length
      setErrConfirmPassword("Passwords must not exceed 15 characters.");
      hasError = true;
    } else if (confirmPassword !== password) {
      setErrConfirmPassword("Passwords do not match");
      hasError = true;
    }

    // If there are no errors, proceed with account creation
    if (!hasError) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // Update the user profile with the display name
          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              displayName: userName,
            })
              .then(() => {
                console.log("Profile updated successfully");
              })
              .catch((error) => {
                console.error("Error updating profile: ", error);
                setLoading(false); // Stop loading on profile update error
              });
          }

          console.log(user);
          setSuccessMsg("Account created successfully!");

          // Clear input fields only on successful registration
          setUserName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          // Redirect to sign-in page after a delay
          setTimeout(() => {
            router.push("/singin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          setLoading(false); // Stop loading on registration error
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrFirebase("Email already in use. Try another one");
          }
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-grow bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <Link href="/">
            <Image
              className="w-32 mb-0 -mt-7 md:-mt-10"
              src={amazonlogo}
              alt="amazonlogo"
            />
          </Link>
          <form
            onSubmit={handleRegistration}
            className="w-full flex flex-col items-start bg-white border border-zinc-200 rounded-md shadow-md p-6 mt-0"
          >
            <h2 className="text-3xl font-medium mb-4">Create account</h2>
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-1">Your name</p>
                <input
                  type="text"
                  value={userName}
                  onChange={handleUserName}
                  className="w-full text-sm bg-white outline-none border border-zinc-400 py-1.5 px-3 focus:border-yellow-500"
                />
                <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1">
                  {errUsername && (
                    <>
                      <span className="italic font-extrabold">!</span>
                      {errUsername}
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-1">Email</p>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  className="w-full text-sm bg-white outline-none border border-zinc-400 py-1.5 px-3 focus:border-yellow-500"
                />
                <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1">
                  {errEmail && (
                    <>
                      <span className="italic font-extrabold">!</span>
                      {errEmail}
                    </>
                  )}
                </p>
                <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1">
                  {errFirebase && (
                    <>
                      <span className="italic font-extrabold">!</span>
                      {errFirebase}
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-1">Password</p>
                <input
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  className="w-full text-sm bg-white outline-none border border-zinc-400 py-1.5 px-3 focus:border-yellow-500"
                />
                <p
                  className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1"
                  style={{ minHeight: "1rem" }}
                >
                  {errPassword && (
                    <>
                      <span className="italic font-extrabold">!</span>
                      {errPassword}
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-1">Re-enter Password</p>
                <input
                  onChange={handleConfirmPassword}
                  type="password"
                  value={confirmPassword}
                  className="w-full text-sm bg-white outline-none border border-zinc-400 py-1.5 px-3 focus:border-yellow-500"
                />
                <p
                  className="text-red-600 text-xs font-bold flex items-center gap-1.5 mt-1"
                  style={{ minHeight: "1rem" }}
                >
                  {errConfirmPassword && (
                    <>
                      <span className="italic font-extrabold">!</span>
                      {errConfirmPassword}
                    </>
                  )}
                </p>
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
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              )}
              {successMsg && (
                <div className="mt-1">
                  <p className="text-base text-green-500 border-[1px] border-green-500 text-center px-2 font-semibold py-1">
                    {" "}
                    {successMsg}
                  </p>
                </div>
              )}

              <p className="text-[13px] text-black leading-4 mt-4 text-left">
                By continuing, you agree to Amazon&apos;s{" "}
                <span className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline">
                  Conditions of Use
                </span>{" "}
                and{" "}
                <span className="text-blue-600 hover:text-orange-700 cursor-pointer hover:underline">
                  Privacy Notice.
                </span>
              </p>
              <div className="border-b-2 border-b-gray-200 py-1 -mt-2"></div>
            </div>
            <div className="w-full py-3 ">
              <p className="text-sm text-black font-bold">Buying for work?</p>
              <p className="text-xs text-blue-600 hover:text-orange-700 cursor-pointer hover:underline">
                Create a free business account
              </p>
              <div className="border-b-2 border-b-gray-200 py-1 mt-2"></div>
            </div>
            <div>
              <p className="text-black font-normal text-sm flex gap-1">
                Already have an account?{" "}
                <Link href="/singin">
                  <span className="flex items-center text-blue-600 hover:text-orange-700 cursor-pointer hover:underline">
                    Sign in{" "}
                    <span>
                      <FaCaretRight />
                    </span>{" "}
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
