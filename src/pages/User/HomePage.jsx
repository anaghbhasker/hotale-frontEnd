import React from "react";
import Header from "../../components/User/Header/Header";
import NavbarNew from "../../components/User/NavbarNew";
import Maillist from "../../components/User/Maillist/Maillist";
import Footer from "../../components/User/Footer/Footer";
import Plan from "../../components/User/Plan";
import Review from "../../components/User/Review";
import ExploreKerala from "../../components/User/ExploreKerala";

function HomePage() {
  return (
    <div>
      <NavbarNew />
      <Header />
      <Plan />
      <ExploreKerala/>
      <h1 className='text-3xl md:text-3xl font-bold px-24 '>Top Rated</h1>
      <section className="py-24  sm:ml-12  ">
        <div className="   ">
          <div
            className="grid grid-cols-1 max-w-sm mx-auto gap-[30px]
            lg:grid-cols-3 lg:max-w-none lg:mx-0"
          >
            <Review />
          </div>
        </div>
      </section>
        <Maillist />
        <Footer />
    </div>
  );
}

export default HomePage;
