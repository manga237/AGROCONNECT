import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{background:"blue",width:'80%',margin:'1rem auto',padding:'2rem',color:"white",fontWeight:'bold',fontSize:'4rem'}}>
         <Link href="/"> APP WATEJA</Link>

        </header>
  );
}