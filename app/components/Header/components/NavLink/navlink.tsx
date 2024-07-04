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
      <Link href={href} className={isActive(href) ? "bg-black text-white" : ""}>
        {label}
      </Link>
    </div>
  );
};

export default NavLink;
