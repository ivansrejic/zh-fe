import { Navbar } from "@nextui-org/react";
import NavLink from "./components/NavLink/navlink";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  return (
    <Navbar>
      <header>
        <div className="flex gap-4 align-items-center border-bottom h-10 p-2 px-10 bg-orange-300">
          <NavLink href={"/"} label={"Home"} />
          <NavLink href={"/products"} label={"Products"} />
        </div>
      </header>
    </Navbar>
  );
};

export default Header;
