"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  label: string;
  href: string;
};

const NavLink = ({ label, href }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <div>
      <Link
        href={href}
        className={
          isActive(href) ? "bg-blue-500 text-white rounded-md p-1" : ""
        }
      >
        {label}
      </Link>
    </div>
  );
};

export default NavLink;
