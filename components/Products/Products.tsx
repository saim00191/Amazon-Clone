"use client";
import axios from "axios";
import { ProductsTypes } from "./types";
import { TiStarFullOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { RiDragMoveLine } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import { useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { addToCart } from "@/redux/Slice";

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = () => {
    setError(null);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) return <p className="text-center">Error: {error.message}</p>;

  return (
    <div className="z-0">
      <div className="grid grid-cols-1 -mt-[80px] md:-mt-[130px] lg:-mt-[170px] z-10  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-screen-2xl gap-8 p-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white group py-8 shadow-lg rounded-lg hover:shadow-lg transition-shadow duration-300 border-[1px] cursor-pointer hover:border-transparent border-gray-200 relative"
          >
            <span className="absolute text-gray-500 font-medium text-xs capitalize italic top-2 right-2">
              {item.category}
            </span>
            <div className="flex items-center justify-center p-4 relative">
              <img
                className="w-full h-48 object-contain"
                src={item.image}
                alt={item.title}
              />
              <ul className="h-36 w-full z-0 absolute flex flex-col items-end bg-gray-100 px-2 border-r border-1 bottom-[-150px] group-hover:bottom-4 transition-all duration-700">
                <li className="productsli">
                  Compare{" "}
                  <span>
                    <RiDragMoveLine size={25} />
                  </span>
                </li>
                <li className="productsli">
                  Add to Cart{" "}
                  <span>
                    <IoMdCart size={25} />
                  </span>
                </li>
                <li className="productsli">
                  View Details{" "}
                  <span>
                    <FaArrowAltCircleRight size={25} />
                  </span>
                </li>
                <li className="productsli">
                  Add to Wish list{" "}
                  <span>
                    <FaHeart size={25} />
                  </span>
                </li>
              </ul>
            </div>
            <div className="px-4 pb-4 z-20 relative bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-amazonBlue font-medium text-lg truncate">
                  {item.title}
                </h2>
                <p className="text-lg font-semibold ">${item.price}</p>
              </div>
              <p className="mt-2 text-gray-600 text-sm truncate">
                {item.description}
              </p>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <TiStarFullOutline
                    key={i}
                    className="text-yellow-500 text-xl"
                  />
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        category: item.category,
                        image: {
                          src: item.image,
                          alt: item.title,
                        },
                        quantity: 1,
                      })
                    )
                  }
                  className="  text-black border-yellow-500 border-[1px] w-full bg-gradient-to-t from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 rounded-md py-2  font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
