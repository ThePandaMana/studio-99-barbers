import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { bookingConnected } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { BookingPlanner } from "@/components/booking/booking-planner";

export const metadata: Metadata = pageMetadata({
  title: "Book an appointment",
  description: `Choose your service and barber at ${site.business.name}, see an estimated price and time, then book.`,
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <PageHeader
        title={<>Book your<br />chair</>}
        intro={
          bookingConnected
            ? `Choose your services and barber, check the estimate, then pick a time on ${site.booking.providerLabel}.`
            : "Choose your services and barber to see an estimate, then call or email the shop to confirm a time."
        }
      />
      <Suspense fallback={<div className="shell min-h-[60vh]" aria-busy="true" />}>
        <BookingPlanner />
      </Suspense>
    </>
  );
}
