import { BackgroundImageMain } from "@/components/background-g-image";
import { Header } from "@/components/header";
import { Container } from "@/components/ui/container";
import { getUserProfile } from "@/lib/api";
import { Title } from "@/components/ui/title";
import Terms from "./_components/terms";

export default async function ShopPage() {
  const [profile] = await Promise.all([getUserProfile()]);
  return (
    <>
      <div className="fixed inset-0 bg-black z-0">
        {/* Base background image */}
        <BackgroundImageMain overlay={false} />
        {/* Overlay bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-black from-15% to-transparent to-25% sm:from-10% sm:to-40% " />
        <div className="absolute inset-0 bg-gradient-to-t from-black from-10% to-transparent to-30% sm:from-5% sm:to-40%" />
      </div>{" "}
      <Header profile={profile} />
      <Container className="relative z-10">
        <div className="px-2 pb-20">
          <Title
            title="TERMS & CONDITIONS"
            description="The rules are the rules..."
          />
          <Terms />
        </div>
      </Container>
    </>
  );
}
