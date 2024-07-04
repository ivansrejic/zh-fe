import { Navbar } from "@nextui-org/react";
import NavLink from "./components/NavLink/navlink";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  return (
    <div className="flex justify-center">
      <Navbar>
        <div className="flex gap-4 align-center border-bottom h-10 p-2 px-10">
          <NavLink href={"/"} label={"Home"} />
          <NavLink href={"/products"} label={"Products"} />
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
