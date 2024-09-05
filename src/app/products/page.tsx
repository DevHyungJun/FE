'use client';

import { Pagination } from "@nextui-org/react";

const Products = () => {

  const itemBoxStyle = 'w-[250px] h-[250px] mx-auto bg-gray-200 cursor-pointer hover:bg-gray-300';
  return (
    <>
      <div className="grid grid-cols-5 max-w-[1300px] gap-3 mx-auto">
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
        <div className={itemBoxStyle}></div>
      </div>
      <div className="flex justify-center mt-10">
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </>
  );
};

export default Products;