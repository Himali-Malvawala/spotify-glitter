const Canvas = (props: any) => {
  return (
    <div className="bg-[#262121] w-[93%] lg:w-10/12 xl:w-[80%] text-center scroll-smooth rounded-xl px-4 sm:px-10 py-16 mb-14">
      {/* drop-shadow-[0_1px_10px_#000] */}
      {/* <button className="bg-[#FFD56F] border-l-4 border-b-4 border-[#88A47C] rounded-l-lg rounded-b-lg hover:border-0 text-black px-4 py-1 rounded-md">
      ADD
    </button> */}
      {props.children}
    </div>
  );
};

export default Canvas;
