/* eslint-disable @next/next/no-img-element */
import axiosInstance from "@/utils/axiosInstance";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const ProductsCards: FC = () => {
  const [cards, setcards] = useState<any>([]);

  const router = useRouter();

  const loggedIn = (id: any) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.push(`/product/${id}`);
    } else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axiosInstance.get("/getAllProducts");

        if (res?.status === 200) {
          console.log("Response data:", res.data);

          const fetchedCards = res.data?.data;

          if (Array.isArray(fetchedCards)) {
            setcards(fetchedCards);
          }
        } else {
          console.error("Unexpected response status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 mt-20">
        <div className=" flex items-center">
          <h2 className="font-bold text-3xl ml-1 mr-auto text-black">{`All Products`}</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-3 w-full mt-5 container mx-auto px-4">
        {cards.length > 0 ? (
          cards.map((item: any, key:number) => {
            return (
              <a key={item._id} onClick={() => loggedIn(item._id)}>
                <div>
                  <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl pb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${item?.image[0]}`}
                      alt="product"
                      loading="lazy"
                      width={300}
                      height={300}
                      className="object-cover w-full h-72"
                    />
                    <div className="flex items-center pt-3 mx-5">
                      <p className="text-medium mr-2 text-gray-700 font-bold">
                        {item?.title}
                      </p>
                      <p className="text-medium text-gray-700 font-bold">
                        {item?.category}
                      </p>
                    </div>
                    <p className="text-medium text-gray-700 font-thin mx-5">
                      {item?.description}
                    </p>
                    <p className="text-medium pt-3 text-gray-700 font-semibold mx-5">
                      ₹ {item?.price}
                    </p>
                  </div>
                </div>
              </a>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default ProductsCards;
