import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import SongForm from "./SongForm";

interface Songs {
  albumID: Number;
  createdAt: Date;
  id: Number;
  image: string;
  name: string;
  updatedAt: Date;
}

const Songs = ({ songs, getSongs }: any) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [deleteID, setDeleteID] = useState<Number>();
  const router = useRouter();
  const albumID = router?.query?.id;

  //delete a song

  const onDelete = async (id: Number) => {
    // if (deleteID) {
    await axios
      .delete(`/api/album/${albumID}/songs/${id}`)
      .then((res) => {
        console.log(`${id} got deleted`);
      })
      .catch((err) => {
        console.log("error while deleting the songs", err);
      });
    // }
  };
  return (
    <div>
      <SongForm getSongs={getSongs} />
      {songs?.length === 0 ? (
        ""
      ) : (
        <div className="text-left">
          <div className="border-b-[1px] text-zinc-400 border-zinc-400 flex mb-3 px-3">
            <div className="w-[60%] text-sm font-normal">TITLE</div>
            <div className="w-[30%] text-sm font-normal">DATE ADDED</div>
            <div className="w-[10%] text-sm font-normal">EDIT/DELETE</div>
          </div>
          {toggleForm && <p>okayokayokay</p>}

          {songs?.map((item: Songs, index: any) => {
            return (
              <div>
                <div
                  key={index}
                  className="flex hover:bg-[#444141]/70 cursor-pointer py-[0.65rem] px-3 rounded-md group animate"
                >
                  <div className="w-[60%] flex gap-2">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-sm shadow-2xl"
                      />
                    </div>
                    <div className="font-medium">{item.name}</div>
                  </div>
                  <div className="w-[30%] text-zinc-400 font-medium">
                    {moment(item.createdAt).fromNow()}
                  </div>
                  <div className="w-[10%] flex items-center gap-3">
                    <AiOutlineEdit
                      className="cursor-pointer text-[#D7E9B9] hover:text-[#FF7B54]"
                      size={23}
                      onClick={() => {
                        setToggleForm(!toggleForm);
                      }}
                    />
                    <MdDeleteOutline
                      onClick={async () => {
                        await setDeleteID(Number(item?.id));
                        console.log("id for delete", item.id);
                        await onDelete(Number(item?.id));
                        getSongs();
                      }}
                      className="cursor-pointer text-[#D7E9B9] hover:text-[#FF7B54]"
                      size={23}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Songs;
