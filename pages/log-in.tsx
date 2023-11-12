import { useForm } from "react-hook-form";
import Input from "@/components/input";
import { useEffect } from "react";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import Link from "next/link";

interface ILoginInfo {
  email: String;
  password: String;
}

export default function Login() {
  const [login, { loading, data, error }] = useMutation("api/users/login");
  const { register, handleSubmit } = useForm<ILoginInfo>();
  const onValid = (data: ILoginInfo) => {
    if (loading) return;
    login(data);
  };
  const router = useRouter();
  useEffect(() => {
    console.log(data);
    if (data?.isSuccess) {
      router.replace("/");
    } else if (data?.error) {
      alert(data?.error);
    }
  }, [data?.isSuccess, data?.error]);
  return (
    <div className="mt-16 px-4 ">
      <h3 className="text-3xl font-bold text-center">Log in to Supp-Tweet</h3>
      <div className="mt-10">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-8">
          <Input
            register={register("email", { required: true })}
            name="email"
            label="Email"
            type="email"
            required
          ></Input>
          <Input
            register={register("password", { required: true })}
            name="password"
            label="PW"
            type="password"
            required
          ></Input>
          <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium mt-2 focus:ring-2 focus:ring-offset-2 focus:to-blue-700 focus:outline-none">
            {loading ? "loading" : "Log in"}
          </button>
        </form>
        <div className="text-gray-600 text-center">
          <span>Don't have an account?</span>
          <span className="cursor-pointer text-blue-700">
            <Link href="/create-account"> Create Account</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
