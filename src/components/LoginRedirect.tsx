import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../context/layout";

export default function LoginRedirect() {
  const { setIsActiveButtonMenu } = useContext(Context);
  
  return (
    <div className="login-redirect">
      <Image
        id="btn-login-redirect"
        src='https://i.postimg.cc/FFccrcSC/image-removebg-preview-2023-01-17-T214238-406.png'
        alt="image"
        width={100}
        height={100}
        priority
      />
      <h1>Faça Login!</h1>
      <span>Realize o login ou cadastre-se pra ter acesso a está função.</span>
      <Link onClick={() => setIsActiveButtonMenu(-1)} href="/login">Go to Login</Link>
    </div>
  );
}
