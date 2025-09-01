'use client';

import { useAuth } from '@contexts/AuthContext';
import ShadowNetworkLogo from '@public/shadow_network_logo_horizontal.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Navbar() {
  const { isLogged, userName } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toLogin = () => {
    const currentUrl =
      process.env.NEXT_PUBLIC_WS_SHADOW_NETWORK_URL +
      pathname +
      (searchParams ? `?${searchParams.toString()}` : '');

    const redirectTo = encodeURIComponent(currentUrl);

    router.push(
      process.env.NEXT_PUBLIC_WS_NQBRAL_GAMES_URL +
        '/signin?redirect_to=' +
        redirectTo,
    );
  };

  return (
    <div className="bg-bg-navbar fixed top-0 z-40 flex w-full flex-row items-center justify-between px-6 py-2 shadow-sm shadow-neutral-950 sm:py-3 md:py-4">
      <Link href="/">
        <div className="flex flex-row items-center gap-2">
          <Image
            src={ShadowNetworkLogo}
            className="w-12 sm:w-16 md:w-20"
            alt="shadow-network-logo-navbar"
          />
        </div>
      </Link>
      {isLogged == null && <></>}
      {isLogged == true && (
        <div>
          <Link
            href={`${process.env.NEXT_PUBLIC_WS_NQBRAL_GAMES_URL}/profile/informations`}
            className="text-xs transition-colors hover:text-neutral-300 sm:text-sm md:text-base"
            target="_blank"
          >
            {userName}
          </Link>
        </div>
      )}
      {isLogged == false && (
        <button
          className="text-xs transition-colors hover:text-neutral-300 sm:text-sm md:text-base"
          onClick={toLogin}
        >
          Se connecter
        </button>
      )}
    </div>
  );
}
