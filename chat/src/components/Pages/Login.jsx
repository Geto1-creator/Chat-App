import "../../index.css";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../common/Provider/AuthProvider";

export const Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  return (
    <section class="bg-gray-50 min-h-screen flex items-center justify-center">
      <div class="bg-gray-200 flex shadow-lg max-w-5xl p-5 rounded-2xl">
        <div class="sm:w-1/2  px-16">
          <h2 class="text-3xl font-bold text-[#002D74]">Login</h2>
          <p class="text-xs mt-4">If you already a member, easily log in</p>

          <form class="flex flex-col" action="">
            <input
              class="p-2 mt-8 rounded-xl border"
              type="text"
              name="email"
              placeholder="Email"
            />
            <div class="relative">
              <input
                class="p-2 mt-8 rounded-xl border w-full"
                type="passsword"
                name="password"
                placeholder="Password"
              />
              <AiOutlineEye class="absolute top-11 right-3" />
            </div>
            <button class="bg-[#002D74] mt-6 rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div class="mt-10 grid grid-cols-3 items-center text-gray-400">
            <hr class="border-gray-400"></hr>
            <p class="text-center">OR</p>
            <hr class="border-gray-400"></hr>
          </div>

          <button
            onClick={signInWithGoogle}
            class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center">
            <FcGoogle class="mr-3" />
            Login with Google
          </button>
          <div class="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>
          <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              Register
            </button>
          </div>
        </div>
        <div class="w-1/2 sm:block hidden">
          <img
            class="rounded-xl h-full"
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
          />
        </div>
      </div>
    </section>
  );
};
