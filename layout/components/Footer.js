import Image from "next/image";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();
  return (
    <>
      {/* <!-- FOOTER-START --> */}
      <footer className="py-10 mt-auto">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-between gap-10">
            <div className="space-y-5">
              <div>
              <Image
                    src="/assets/DM-Logo.png"
                    alt="lazy-loader"
                    className="object-cover lg:w-44 w-36 h-9 lg:h-11"
                    width={720}
                    height={720}
                  />
                  
              </div>
              <p className="text-sm text-gray-700 max-w-xs xl:pr-20">
                Accelerate your projects with millions of ready-to-use products.
              </p>
              <div className="flex items-center gap-4 text-[#5a5a5b] xl:text-2xl text-xl">
                <i className="fa-brands fa-pinterest hover:text-gray-900"></i>
                <i className="fa-brands fa-facebook-f hover:text-gray-900"></i>
                <i className="fa-brands fa-twitter hover:text-gray-900"></i>
                <i className="fa-brands fa-instagram hover:text-gray-900"></i>
              </div>
            </div>
            <div className="flex flex-wrap lg:justify-around md:gap-20 sm:gap-10 gap-16 grow">
              <div className="text-gray-700 w-full md:w-auto space-y-4">
                <h3 className="font-bold">Earn</h3>
                <ul className="space-y-3 text-gray-900">
                  <li>
                    <a>Affiliate Partner Benefits</a>
                  </li>
                  <li>
                    <a>Shop Benefits</a>
                  </li>
                </ul>
              </div>
              <div className="text-gray-700 space-y-4">
                <h3 className="font-bold">Resources</h3>
                <ul className="space-y-3 text-gray-900">
                  <li>
                    <a>Blog</a>
                  </li>
                  <li className="cursor-pointer">
                    <a
                      onClick={() => {
                        router.push("/collection/list");
                      }}
                    >
                      Collections
                    </a>
                  </li>
                  <li>
                    <a>Help Center </a>
                  </li>
                  <li>
                    <a>Licences</a>
                  </li>
                </ul>
              </div>
              <div className="text-gray-700 space-y-4">
                <h3 className="font-bold">The Goods</h3>
                <ul className="space-y-3 text-gray-900">
                  <li>
                    <a>Branding eBook </a>
                  </li>
                  <li>
                    <a>Free Drops</a>
                  </li>
                  <li>
                    <a>Gift Cards</a>
                  </li>
                  <li>
                    <a>Enterprise Sales</a>
                  </li>
                </ul>
              </div>
              <div className="text-gray-700 space-y-4">
                <h3 className="font-bold">Company</h3>
                <ul className="space-y-3 text-gray-900">
                  <li>
                    <a>About</a>
                  </li>
                  <li>
                    <a>Brand</a>
                  </li>
                </ul>
              </div>
              <div className="text-gray-700 space-y-4">
                <h3 className="font-bold">Dribbble</h3>
                <ul className="space-y-3 text-gray-900">
                  <li>
                    <a>Designer Inspiration</a>
                  </li>
                  <li>
                    <a>Hire a Designer</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 pt-20">
            <p className="text-gray-900 text-sm text-center lg:text-start">
              Copyright © 2023 Creative Market, a Dribbble company. All rights
              reserved.
            </p>
            <div className="text-gray-900 order-first lg:order-none sm:text-sm text-xs flex items-center lg:justify-end justify-center lg:gap-5 sm:gap-4 gap-2">
              <a className="underline">
                Privacy Policy
              </a>
              <a className="underline">
                {" "}
                Terms of Service
              </a>
              <a className="underline">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- FOOTER-END --> */}
    </>
  );
}

export default Footer;
