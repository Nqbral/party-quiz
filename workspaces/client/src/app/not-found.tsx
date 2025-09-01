import LinkButton, { TypeLinkButton } from '@components/buttons/LinkButton';
import Footer from '@components/footer/Footer';
import Navbar from '@components/navbar/Navbar';
import { Metadata } from 'next';

import LoadingAuth from './layout/LoadingAuth';

export const metadata: Metadata = {
  title: 'Page incorrecte - Shadow Network',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <LoadingAuth>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-primary text-4xl">Page introuvable !</h1>
        <LinkButton
          buttonText="Retour à la page principale"
          linkTo="/"
          typeButton={TypeLinkButton.secondary}
        />
      </div>
      <Footer />
    </LoadingAuth>
  );
}
