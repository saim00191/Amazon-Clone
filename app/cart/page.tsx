"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { deleteItem, incrementItem, decrementItem, setProducts } from '@/redux/Slice';
import UpperHeader from '@/components/Header/UpperHeader/UpperHeader';
import Footer from '@/components/Footer/Footer';
import { RootState } from "@/redux/store";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state:RootState) => state.amazonReducer.products);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Load cart items from local storage
    const storedProducts = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (storedProducts.length > 0) {
      dispatch(setProducts(storedProducts));
    }
  }, [dispatch]);

  useEffect(() => {
    const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);

    // Save cart items to local storage whenever products change
    localStorage.setItem('cartItems', JSON.stringify(products));
  }, [products]);

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
  };

  const handleIncrement = (id: number) => {
    dispatch(incrementItem(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementItem(id));
  };

  const handlePay = () => {
    alert('Important Notice: \nThis is a clone website and not an official Amazon platform. For secure orders, please visit the official Amazon website.');
  };

  return (
    <>
      <UpperHeader />
      <div className="w-full bg-gray-100 p-6">
        <div className="max-w-[1440px] mx-auto h-full grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="w-full h-full bg-white rounded-lg shadow-md px-4 py-6 col-span-1 md:col-span-5 lg:col-span-4">
            <div className="flex items-center justify-between border-b-2 pb-3 border-gray-300">
              <h2 className="xs:text-[15px] sm:text-[17px] sml:text-[22px] text-2xl font-semibold text-gray-800">Shopping Cart</h2>
              <p className="xs:text-[12px] sm:text-[14px] sml:text-[20px] text-xl font-normal text-gray-600">Sub Total: ${totalAmount.toFixed(2)}</p>
            </div>
            <div className="mt-4">
              {products.length > 0 ? (
                products.map((item) => (
                  <div key={item.id} className="w-full p-4 flex flex-col md:flex-row items-start border-b border-gray-300 gap-4">
                    <div className="w-full md:w-1/4">
                      <Image
                        className="w-full h-52 rounded-md"
                        src={item.image.src}
                        alt={item.title}
                        height={300}
                        width={300}
                      />
                    </div>
                    <div className="w-full md:w-3/4 px-4">
                      <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
                      <p className="font-normal text-md text-gray-600 mt-1">{item.description.substring(0, 200)}....</p>
                      <p className="font-medium mt-2">Price: <span className="font-semibold text-red-600">${item.price}</span></p>
                      <div className="mt-1 flex items-center shadow-lg bg-[#F0F2F2] w-28 justify-between gap-1 px-2">
                        <p>Qty:</p>
                        <button onClick={() => handleDecrement(item.id)} className="cursor-pointer bg-gray-200 px-1 rounded-md duration-300 hover:bg-gray-400">-</button>
                        <p>{item.quantity}</p>
                        <button onClick={() => handleIncrement(item.id)} className="cursor-pointer bg-gray-200 px-1 rounded-md duration-300 hover:bg-gray-400">+</button>
                      </div>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-500 w-32 rounded-md hover:bg-red-700 cursor-pointer mt-3 py-0.5 text-white">
                        Delete item
                      </button>
                    </div>
                    <div className="md:flex md:items-center md:justify-end mt-2 md:mt-0">
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-xl font-semibold text-gray-600">No products found.</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-52 py-3 px-5 bg-white rounded-lg md:col-span-5 lg:col-span-1 flex flex-col items-center justify-center">
            <div>
              <p className="flex items-start gap-2 text-sm">
                <span className="mt-1 bg-white rounded-full text-green-500"><FaCircleCheck /></span>
                Your Order qualifies for FREE Shipping. Choose this option at checkout. See details
              </p>
            </div>
            <div>
              <p className="flex items-center justify-between px-10 py-2">Total: <span className="font-bold ml-0.5">${totalAmount.toFixed(2)}</span></p>
            </div>
            <button onClick={handlePay} className="text-black w-52 border-yellow-500 border-[1px] bg-gradient-to-t from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-500 rounded-md py-1 font-semibold">
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
