import axiosInstance from "@/utils/axiosInstance";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar: FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userDetails: any = localStorage.getItem("userDetails");

    console.log(userDetails, "userDetails");

    if (!userDetails) {
      console.log("No user details !!!!");
      setisLoggedIn(false);
      return;
    }

    setisLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("accessToken");

    axiosInstance
      .get("/logout")
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setisLoggedIn(false);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          console.log(`Error ${res?.data}`);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-black border-black-200 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between  p-4">
            <Link href="/" passHref>
              <p className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
                  <i className="fa-solid fa-shop"></i> &nbsp; E-Commerce
                </span>
              </p>
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => handleMenuToggle()}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } w-full lg:block lg:w-auto`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-black-100 rounded-lg bg-black-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 md:border-0 lg:bg-black dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link href="/allProducts" passHref>
                    <p className="block py-2 px-3 text-lg rounded md:p-0 md:px-8 text-white">
                      <i className="fa-solid fa-filter"></i>All Products
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/" passHref>
                    <p className="block py-2 px-3 text-lg rounded md:p-0 md:px-8 text-white dark:text-white md:dark:text-white-500">
                      <i className="fa-solid fa-percent px-2"></i>Offers
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/" passHref>
                    <p className="block py-2 px-3 text-lg rounded md:p-0 md:px-8 text-white dark:text-white md:dark:text-white-500">
                      <i className="fa-solid fa-handshake-angle px-2"></i>Help
                    </p>
                  </Link>
                </li>
                <li>
                  {isLoggedIn ? (
                    <button
                      onClick={() => handleLogout()}
                      className="block py-2 px-3 text-lg text-white rounded md:p-0 md:px-8 dark:text-white md:dark:text-white-500"
                    >
                      <i className="fa-solid fa-user px-2"></i>Log out
                    </button>
                  ) : (
                    <Link href="/signin" passHref>
                      <p className="block py-2 px-3 text-lg rounded md:p-0 md:px-8 text-white dark:text-white md:dark:text-white-500">
                        <i className="fa-solid fa-user px-2"></i>Sign In
                      </p>
                    </Link>
                  )}
                </li>
                <li>
                  <Link href="/" passHref>
                    <p className="block py-2 px-3 text-lg rounded md:p-0 md:px-8 text-white dark:text-white md:dark:text-white-500">
                      <i className="fa-solid fa-cart-shopping px-2"></i>Cart
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
