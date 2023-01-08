import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound-field">
      <div className="div-image">
        <h1>404</h1>
        <Image
          src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
          alt="NotFound 404 Image"
          fill
          priority
          loading="eager" 
        />
        <div className="div-info">
          <h3>Look like you&apos;re lost</h3>
          <p>the page you are looking for not avaible!</p>
          <Link href='/' className="btn-home">Go to Home</Link>
        </div>
      </div>
    </div>
  );
}
