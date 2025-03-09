'use client';
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className='home_container'>
      <nav className='home_navbar'>
        <div>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
        <div>
          <button className='home_menu_button'>Menu</button>
        </div>
      </nav>
      <div className='home_title'>
        SHOP SMART.<br/>SHOP COMPARELY.
      </div>
      <div className='home_subtitle'>
        Your one-stop shop for any price comparisons.
      </div>
      <div className='home_compare_button_container'>
        <button 
          className='home_compare_button' 
          onClick={() => router.push("/compare")}
        >
          Compare Now
        </button>
      </div>
    </div>
  );
}
