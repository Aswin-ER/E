/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

const ProductDetail: FC<any> = (data: any) => {
  const [product, setProduct] = useState(data.data);
  console.log(product, "product here");

  return (
    <>
      <div className="container mx-auto mt-20">
        <div className="flex items-center px-4">
          <h2 className="font-bold text-3xl ml-1 mr-auto text-black">
            Product Detail
          </h2>
        </div>
      </div>

      <div className="container mx-auto py-5">
        {product ? (
          <div className="px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
              <div className="col-span-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${product?.image?.[0]}`}
                  alt="product"
                  loading="lazy"
                  width={300}
                  height={300}
                  className="object-cover w-full h-96 rounded-xl shadow-md"
                />
              </div>

              <div className="col-span-2">
                <div className="flex flex-col space-y-4">
                  <h1 className="text-4xl font-bold">{product?.title}</h1>
                  <p className="text-lg text-gray-700">{product?.category}</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    ₹ {product?.price}
                  </p>
                  <p className="text-gray-700">{product?.description}</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md w-1/2">
                    Add to Cart
                  </button>
                </div>

                {/* Reviews Section */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <div className="mt-4">
                    {/* Dummy Reviews */}
                    <div className="mb-4">
                      <p className="font-semibold">John Doe</p>
                      <p className="text-gray-600">This product is amazing!</p>
                    </div>
                    <div className="mb-4">
                      <p className="font-semibold">Jane Smith</p>
                      <p className="text-gray-600">Highly recommended.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {/* Dummy Related Product */}
                <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl pb-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/upload/rickshaw-pattern-249638.webp`}
                    alt="related product"
                    className="object-cover w-full h-96 rounded-xl shadow-md"
                  />
                  <div className="p-4">
                    <p className="text-lg font-bold">Rickshaw Pattern</p>
                    <p className="text-gray-600">Shirt</p>
                    <p className="text-lg font-semibold">₹ 999</p>
                  </div>
                </div>
                {/* Repeat for other related products */}

                <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl pb-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/upload/rickshaw-pattern-249638.webp`}
                    alt="related product"
                    className="object-cover w-full h-96 rounded-xl shadow-md"
                  />
                  <div className="p-4">
                    <p className="text-lg font-bold">Rickshaw Pattern</p>
                    <p className="text-gray-600">Shirt</p>
                    <p className="text-lg font-semibold">₹ 999</p>
                  </div>
                </div>

                <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl pb-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/upload/rickshaw-pattern-249638.webp`}
                    alt="related product"
                    className="object-cover w-full h-96 rounded-xl shadow-md"
                  />
                  <div className="p-4">
                    <p className="text-lg font-bold">Rickshaw Pattern</p>
                    <p className="text-gray-600">Shirt</p>
                    <p className="text-lg font-semibold">₹ 999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
