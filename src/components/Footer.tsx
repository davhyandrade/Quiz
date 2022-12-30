import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <div> 
          <a onClick={() => window.scrollTo(0, 0)}>Inicio</a>
          <Link href="/login">Entrar</Link>
        </div>
        <div>
          <Link href="https://github.com/davhyandrade">
            <img src="https://i.postimg.cc/4NccjBYr/logo-github.png" alt="logo github" />
          </Link>
          <Link href="https://www.linkedin.com/in/davhy-andrade-dev">
            <img src="https://i.postimg.cc/kgFbgGFs/logo-linkedin.png" alt="logo linkedin" />
          </Link>
          <Link href="https://www.instagram.com/_davhy/">
            <img src="https://i.postimg.cc/2SPR5drR/logo-instagram.png" alt="logo instagram" />
          </Link>
        </div>
        <p>
          <span>© 2022 Davhy Andrade</span> - Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
