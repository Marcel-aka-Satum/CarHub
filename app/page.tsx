import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils/api";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    model: searchParams.model || "",
    year: searchParams.year || 2022,
    limit: searchParams.limit || 12,
  });
  const emptyData = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  console.log(allCars);
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like.</p>
        </div>

        {/*Search filters*/}
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
      </div>

      {!emptyData ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
          <ShowMore
            pageNumber={(searchParams.limit || 10) / 10} // we are showing 10 cars per page
            isNext={(searchParams.limit || 10) < allCars?.length} // if the limit is greater than the number of cars, there is no next page
          />
        </section>
      ) : (
        <div className="home__error-container">
          <h1 className="text-black text-xl font-bold">NO DATA</h1>
          <p>{allCars?.message}</p>
        </div>
      )}
    </main>
  );
}
