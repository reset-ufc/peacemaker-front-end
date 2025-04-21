import { Features } from "@/components/layout/Features";
import { Footer } from "@/components/layout/Footer";
import { Stat } from "@/components/layout/Stat";
import { Team } from "@/components/layout/Team";

export function HomePage() {
  return (
    <>
      <Features />
      <Stat />
      <Team />
      <Footer />
    </>
  );
}
