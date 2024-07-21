import axiosInstance from "@/utils/axiosInstance";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar: FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const router = useRouter();

  const [activeLink, setActiveLink] = useState(""); // Track the active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track the mobile menu state

  useEffect(() => {
    const userDetails: any = localStorage.getItem("userDetails");

    console.log(userDetails, "userDetails");

    if (!userDetails) {
      console.log("No user details !!!!");
      setisLoggedIn(false);
      return;
    }
    // const { user_name } = JSON.parse(userDetails);

    setisLoggedIn(true);
  }, [isLoggedIn]);

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

  const handleLinkClick = (link: any) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close the mobile menu when a link is clicked
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-black border-black-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" passHref>
            <p className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
                E-Commerce
              </span>
            </p>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-black-100 rounded-lg bg-black-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/allProducts" passHref>
                  <p
                    className={`block py-2 px-3 text-lg rounded md:p-0 md:px-8 ${
                      activeLink === "allProducts"
                        ? "text-blue-700 md:text-blue-700 dark:text-blue-700 dark:md:text-blue-700"
                        : "text-white"
                    }`}
                    onClick={() => handleLinkClick("allProducts")}
                  >
                    <i className="fa-solid fa-magnifying-glass px-2"></i>All
                    Products
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/offers" passHref>
                  <p
                    className={`block py-2 px-3 text-lg rounded md:p-0 md:px-8 ${
                      activeLink === "offers"
                        ? "text-blue-700 md:text-blue-700"
                        : "text-white"
                    } dark:text-white md:dark:text-white-500`}
                    onClick={() => handleLinkClick("offers")}
                  >
                    <i className="fa-solid fa-percent px-2"></i>Offers
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/help" passHref>
                  <p
                    className={`block py-2 px-3 text-lg rounded md:p-0 md:px-8 ${
                      activeLink === "help"
                        ? "text-blue-700 md:text-blue-700"
                        : "text-white"
                    } dark:text-white md:dark:text-white-500`}
                    onClick={() => handleLinkClick("help")}
                  >
                    <i className="fa-solid fa-handshake-angle px-2"></i>Help
                  </p>
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      handleLinkClick("");
                    }}
                    className="block py-2 px-3 text-lg text-white rounded md:p-0 md:px-8 dark:text-white md:dark:text-white-500"
                  >
                    <i className="fa-solid fa-user px-2"></i>Log out
                  </button>
                ) : (
                  <Link href="/signin" passHref>
                    <p
                      className={`block py-2 px-3 text-lg rounded md:p-0 md:px-8 ${
                        activeLink === "signin"
                          ? "text-blue-700 md:text-blue-700"
                          : "text-white"
                      } dark:text-white md:dark:text-white-500`}
                      onClick={() => handleLinkClick("signin")}
                    >
                      <i className="fa-solid fa-user px-2"></i>Sign In
                    </p>
                  </Link>
                )}
              </li>
              <li>
                <Link href="/cart" passHref>
                  <p
                    className={`block py-2 px-3 text-lg rounded md:p-0 md:px-8 ${
                      activeLink === "cart"
                        ? "text-blue-700 md:text-blue-700"
                        : "text-white"
                    } dark:text-white md:dark:text-white-500`}
                    onClick={() => handleLinkClick("cart")}
                  >
                    <i className="fa-solid fa-cart-shopping px-2"></i>Cart
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
