import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { GithubIcon } from "@/components/icons";
import { subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-start justify-center gap-4 py-4 px-4">
        <span className="font-black text-5xl text-blue-600">
          Maximise Repeat Revenue &nbsp;
        </span>

        <span className="font-black text-5xl">
          with 10x easier personalisation
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Unify customer data, generate insights, personalise marketing
          communications across SMS, Email, Whatsapp & Instagram to delight your
          loyal customers.
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          isExternal
          as={Link}
          className="bg-blue-600 text-white"
          href={siteConfig.links.github}
          radius="full"
          size="lg"
          variant="solid"
        >
          <GithubIcon size={20} />
          GitHub
        </Button>
      </div>
    </section>
  );
}
