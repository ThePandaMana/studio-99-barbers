import { site } from "@/config/site";

export function Values() {
  return (
    <section aria-labelledby="values-title" className="shell py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="values-title" className="display display-lg lg:sticky lg:top-28">
            Why clients
            <br />
            keep coming
            <br />
            back
          </h2>
        </div>
        <dl className="grid border-t hairline sm:grid-cols-2 lg:col-span-7">
          {site.values.map((v, i) => (
            <div
              key={v.title}
              className={`border-b hairline py-10 sm:px-8 ${i % 2 === 0 ? "sm:border-r sm:pl-0" : ""}`}
            >
              <dt className="flex items-center gap-3">
                <span aria-hidden className="h-6 w-1 bg-copper" />
                <span className="display text-[2rem]">{v.title}</span>
              </dt>
              <dd className="mt-4 max-w-sm text-mute">{v.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
