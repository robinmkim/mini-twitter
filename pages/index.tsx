import { NextPage } from "next";
import "../libs/server/client";
import useUser from "@/libs/client/useUser";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  return (
    <div className="bg-red-100">
      <h1 className="text-black">Hi, {user.name}! Welcome</h1>
    </div>
  );
};

export default Home;
