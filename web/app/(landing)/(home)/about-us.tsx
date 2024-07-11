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
              Kenapa BersihBet?
            </h2>
          </header>

          <p className="mt-8 text-xl text-primary-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Pellentesque habitant morbi tristique senectus. Interdum velit
            laoreet id donec ultrices tincidunt. Vestibulum lorem sed risus
            ultricies tristique. Aliquet lectus proin nibh nisl condimentum. Sem
            integer vitae justo eget magna fermentum iaculis. Quam id leo in
            vitae turpis massa sed elementum. Consectetur{" "}
          </p>
        </div>

        {/* Image */}
        <div className="rounded-2xl bg-primary-gray" />
        {/* <Image src="/home/photo" /> */}
      </article>
    </section>
  );
}
