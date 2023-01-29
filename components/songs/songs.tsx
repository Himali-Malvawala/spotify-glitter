import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import SongForm from "./SongForm";
import Button from "../button/Button";

interface Songs {
  albumID: Number;
  createdAt: Date;
  id: Number;
  image: string;
  name: string;
  updatedAt: Date;
}

interface FormData {
  name: string;
  image: string;
}

const Songs = ({ songs, getSongs, toggleCreateForm }: any) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [deleteID, setDeleteID] = useState<Number>();
  const [details, setDetails] = useState<Songs>();
  const [form, setForm] = useState<FormData>({ name: "", image: "" });
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

  //update a song

  const onChangeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (data: FormData, id: number) => {
    try {
      axios
        .put(`/api/album/${albumID}/songs/${id}`, data)
        .then((res) => {
          // setDetails({ name: "", image: "" })
          setToggleForm(false);
          getSongs();
        })
        .catch((err) => {
          console.log("err while updating", err);
        });
    } catch (error) {
      console.log("error while updating the song", error);
    }
  };

  return (
    <div>
      <SongForm getSongs={getSongs} toggleCreateForm={toggleCreateForm} />
      {songs?.length === 0 ? (
        ""
      ) : (
        <div className="text-left">
          <hr className="md:hidden my-5 border-[#FF7B54] border-[1px]" />
          <div className="hidden border-b-[1px] text-zinc-400 border-zinc-400 md:flex mb-3 px-3">
            <div className="w-[60%] text-sm font-normal">TITLE</div>
            <div className="w-[30%] text-sm font-normal">DATE ADDED</div>
            <div className="w-[10%] text-sm font-normal">EDIT/DELETE</div>
          </div>
          {toggleForm && (
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  submitHandler(form, Number(details?.id));
                  getSongs();
                }}
                className="mb-7 flex flex-col md:flex-row justify-between gap-4"
              >
                <input
                  type="text"
                  placeholder={details?.name}
                  name="name"
                  value={form?.name}
                  onChange={onChangeHandler}
                  className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
                />
                <input
                  type="text"
                  placeholder={details?.image}
                  name="image"
                  value={form?.image}
                  onChange={onChangeHandler}
                  className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
                />
                <Button title="Update" type="submit" />
              </form>
            </div>
          )}

          {songs?.map((item: Songs, index: any) => {
            return (
              <div key={index}>
                <div className="flex hover:bg-[#444141]/70 cursor-pointer py-[0.65rem] px-3 rounded-full group animate-fade-in-up">
                  <div className="w-[75%] md:w-[60%] flex items-center gap-2">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-full shadow-2xl object-cover object-center"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="md:hidden text-zinc-400 font-normal text-xs">
                        {moment(item.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-[30%] text-zinc-400 font-medium">
                    {moment(item.createdAt).fromNow()}
                  </div>
                  <div className="w-[25%] md:w-[10%] flex items-center gap-3">
                    <AiOutlineEdit
                      className="cursor-pointer text-[#D7E9B9] hover:text-[#FF7B54]"
                      size={23}
                      onClick={() => {
                        setToggleForm(!toggleForm);
                        setDetails(item);
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
