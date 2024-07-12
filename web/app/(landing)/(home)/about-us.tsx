import Image from "next/image";

export function AboutUs() {
  return (
    <section className="flex w-full items-center justify-center p-24">
      <article className="grid w-full max-w-7xl grid-cols-2 gap-16 rounded-3xl bg-primary-black p-16">
        {/* Paragraphs */}
        <div>
          <header>
            <h1 className="text-3xl font-bold text-primary-green">About Us</h1>

            <h2 className="text-6xl font-extrabold text-primary-white">
              Why<br></br> GambleGone?
            </h2>
          </header>

          <p className="mt-8 text-xl text-primary-white text-justify">
            As online gambling entices over 2.8 million Indonesians, the
            government has dedicated substantial efforts to eradicate this
            growing issue, achieving significant societal impact. However, many
            individuals still struggle with gambling addiction, left behind by
            broad regulatory measures. GambleGone aims to bridge this gap by
            providing comprehensive support and guidance through advanced
            AI-generated tools and personalized resources. GambleGone is
            dedicated to making a meaningful difference in the lives of those
            affected by gambling addiction, offering a lifeline to recovery and
            a brighter, addiction-free future.{" "}
          </p>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-square rounded-2xl w-full items-center justify-center">
            <Image
              src="/about-us.jpg"
              fill
              alt={"home-photo"}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </article>
    </section>
  );
}
