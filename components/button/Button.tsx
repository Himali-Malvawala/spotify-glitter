const Button = (props: any) => {
  return (
    <button
      type={props?.type}
      className="relative inline-flex items-center justify-center px-4 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
    >
      <span className="absolute inset-0 w-full h-full mt-[0.35rem] ml-[0.35rem] transition-all duration-300 ease-in-out bg-[#227C70] rounded-md group-hover:mt-0 group-hover:ml-0"></span>
      <span className="absolute inset-0 w-full h-full bg-[#FFD56F] rounded-md "></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#227C70] rounded-md opacity-0 group-hover:opacity-100 "></span>
      <span className="relative text-[#227C70] transition-colors duration-200 ease-in-out delay-100 group-hover:text-[#FFD56F]">
        {props.title}
      </span>
    </button>
  );
};

export default Button;
