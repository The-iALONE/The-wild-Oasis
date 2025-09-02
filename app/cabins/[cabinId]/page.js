import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = {
//     title: "Cabin"
// }

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId); // take 2 seconds with test interwall or time out wich is bad
  // const settings = await getSettings(); // take 2 seconds with test interwall or time out wich is bad
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId); // 4 second load time wich is bad because waterfall block in it slow down page load taime for items that dont depond on this page so we do this

  // but there is a better way, in ke har kodom ro dakhale ye component bezarim va har component dade e ke dare va niyaz dare ro fetch kone

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
