import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/contants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import { randomInt } from "crypto";


export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const allCars = await fetchCars({
    manufacturer: params.manufacturer || '',
    year: params.year || 2022,
    fuel: params.fuel || '',
    limit: params.limit || 10,
    model: params.model || '',
  });

  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || '',
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || '',
  // });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (

    <main className="overflow-hidden" >
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4x1 font-extrabold">Car Cataloque</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard
                  key={randomInt(9999999)}
                  car={car}
                />
              ))}
            </div>

            <ShowMore
              pageNumber={(params.limit || 10) / 10}
              isNext={(params.limit || 10) > allCars.length}
            />




          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}



      </div>
    </main >
  )

}
