import { SignedIn } from '@/components/auth';
import { SignedOut } from '@/components/auth';
import Container from '@/components/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <>
      <Container>
        <div className="flex flex-col md:flex-row gap-y-14 w-full justify-between">
          <div className="">
            <Badge className="text-sm md:text-base">
              Descubra o mundo das plantas
            </Badge>
            <h1 className="text-5xl md:text-7xl max-w-3xl mt-10 leading-[1.2] font-semibold">
              Explore e aprenda sobre diferentes espécies de plantas
            </h1>
            <p className="mt-5 text-gray-500 text-lg max-w-[600px]">
              Nosso sistema permite que você descubra informações fascinantes sobre 
              plantas. Cada planta tem sua própria página com fotos e história, acessível 
              através de um QR code. Comece agora a explorar o incrível mundo natural.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 mt-10">
              <SignedIn>
                <Button asChild>
                  <Link href={'/dashboard'}>Visualizar Plantas</Link>
                </Button>
              </SignedIn>

              <SignedOut>
                <Button asChild>
                  <Link href={'/sign-in'}>Crie uma conta</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
          <Image
            className="rounded-xl w-[400px] h-[400px]"
            width="400"
            height="400"
            src="/hero-section-plant.webp"
            alt="Imagem de uma planta"
          />
        </div>
      </Container>
    </>
  );
}
