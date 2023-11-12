import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IAccountInfo {
  name: String;
  email: String;
  password: String;
  passwordConfirm: String;
}

export default function Createuser() {
  const router = useRouter();
  const [signup, { loading, data, error }] = useMutation(
    "api/users/createuser"
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAccountInfo>();
  const password = watch("password");
  const onValid = (data: IAccountInfo) => {
    if (loading) return;
    console.log(data);
    signup(data);
  };
  console.log(watch());
  useEffect(() => {
    if (router.pathname === "/create-account" && data?.isSuccess) {
      alert("Account has been created");
      router.push("/log-in");
    } else if (router.pathname === "/create-account" && data?.error) {
      alert(data?.error);
    }
  }, [data, router]);
  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Log in to Supp-Tweet</h3>
      <div className="mt-10">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-8">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <div className="rounded-md relative flex  items-center shadow-sm">
              <input
                id="name"
                {...register("name", { required: true })}
                type="text"
                className="appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700"
              />
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="Email"
            >
              Email
            </label>
            <div className="rounded-md relative flex  items-center shadow-sm">
              <input
                id="Email"
                {...register("email", { required: true })}
                type="email"
                className="appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700"
              />
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              PW
            </label>
            <div className="rounded-md relative flex  items-center shadow-sm">
              <input
                id="password"
                {...register("password", { required: true })}
                type="password"
                className="appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700"
              />
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700"
              htmlFor="passwordConfirm"
            >
              Confirm Password
            </label>
            <div className="rounded-md relative flex flex-col items-center shadow-sm">
              <input
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "위와 같은 비밀번호를 입력해 주세요.",
                  validate: {
                    validate: (value) =>
                      value === password || "Password does not match.",
                  },
                })}
                type="password"
                className={`appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-blue-700 focus:border-blue-700 ${
                  errors.passwordConfirm &&
                  "bg-red-50 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                }`}
              />
              {errors.passwordConfirm && (
                <div className="mb-3 ml-2 text-red-500 text-normal ">
                  {errors.passwordConfirm.message}
                </div>
              )}
            </div>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium mt-2 focus:ring-2 focus:ring-offset-2 focus:to-blue-700 focus:outline-none">
            {loading ? "loading" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
