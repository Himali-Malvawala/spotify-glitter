import Link from "next/link";
import moment from "moment";
import { FaPlay } from "react-icons/fa";

const AlbumCard = (props: any) => {
  return (
    <Link href={`/${props?.item?.id}`}>
      <div className="md:hidden group animate-fade-in-up">
        <div>
          <img
            src={props?.item?.image}
            alt={props?.item?.name}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover object-center drop-shadow-xl"
          />
          <h6 className="text-left ext-ellipsis overflow-hidden w-32 sm:w-40 mt-1 font-medium text-zinc-200 group-hover:text-white">
            {props?.item?.name}
          </h6>
        </div>
      </div>
      <div className="hidden group w-52 h-fit  bg-[#444141]/40 hover:bg-[#444141]/70 pt-[0.70rem] pb-8 md:flex flex-col items-center rounded-lg shadow-xl animate-fade-in-up cursor-pointer">
        <div className="relative">
          <img
            src={props?.item?.image}
            alt={props?.item?.name}
            className="h-40 w-44 rounded-md drop-shadow-[0_5px_10px_#1a1515] object-cover object-center"
          />
          <div className="absolute bottom-3 right-3 w-11 h-11 bg-[#FF7B54] rounded-full transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 shadow-2xl flex flex-col items-center justify-center">
            <FaPlay className="text-[#227C70] ml-[0.15rem]" />
          </div>
          {/* <BsPlayCircle className="absolute bottom-3 right-3 w-11 h-11 bg-[#FF7B54] rounded-full transition-opacity duration-1000 ease-out opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 shadow-2xl" /> */}
        </div>
        <h6 className="text-left mr-auto px-5 font-semibold text-lg mt-4 text-ellipsis overflow-hidden w-52">
          {props?.item?.name}
        </h6>
        <p className="text-left mr-auto px-5 font-[550] text-sm text-zinc-400 mt-[0.15rem]">
          {moment(props?.item?.createdAt).fromNow()}
        </p>
      </div>
    </Link>
  );
};

export default AlbumCard;
