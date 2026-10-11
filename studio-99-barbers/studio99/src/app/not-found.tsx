import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="display outline-type text-[clamp(8rem,30vw,20rem)]" aria-hidden>404</p>
      <h1 className="display display-md -mt-6">This chair is empty.</h1>
      <p className="mt-4 max-w-md text-mute">The page you were looking for has moved or never existed. Head back home or book your next cut.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/booking" variant="outline">Book a chair</ButtonLink>
      </div>
    </section>
  );
}
