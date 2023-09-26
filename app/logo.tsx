import React from "react";
import daimaruLogo from "../public/daimaru.svg";
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href="/dashboard">
      <div>
        <Image src={daimaruLogo} alt="logo" width={140}/>
      </div>
    </Link>
  );
};

export default Logo;
