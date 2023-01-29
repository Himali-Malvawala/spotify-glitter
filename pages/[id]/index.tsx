import { Rubik } from "@next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import axios from "axios";
import moment from "moment";
import { BsDot } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiLoader3Line } from "react-icons/ri";
import Canvas from "../../components/canvas/Canvas";
import Button from "../../components/button/Button";
// import Songs from "../../components/songs/songs";

const Songs = dynamic(() => import("../../components/songs/songs"), {
  ssr: false,
});

const rubik = Rubik({
  style: "italic",
  weight: "800",
  subsets: ["latin"],
});

interface Details {
  id: Number;
  name: String;
  image: String;
  createdAt: Date;
}

interface Songs {
  albumID: Number;
  createdAt: Date;
  id: Number;
  image: string;
  name: string;
  updatedAt: Date;
}

interface FormData {
  name: String;
  image: String;
}

const AlbumDetails = () => {
  const [details, setDetails] = useState<Details>();
  const [hasFetched, setHasFetched] = useState(false);
  const [effect, setEffect] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", image: "" });
  const [songs, setSongs] = useState<Songs[]>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const albumID = router?.query?.id;

  //get album details

  const get = async () => {
    await axios
      .get(`/api/album/${albumID}`)
      .then((res) => {
        setDetails(res?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    if (albumID && !hasFetched) {
      setHasFetched(true);
      get();
      setLoading(false);
    }
  }, [albumID]);

  //delete an album

  const onDelete = async (id: Number) => {
    await axios
      .delete(`/api/album/${id}`)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        console.log("error onDelete", err);
      });
  };

  //update the album and submit the form

  const onChangeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (data: FormData) => {
    try {
      axios
        .put(`/api/album/${details?.id}`, data)
        .then((res) => {
          setForm({
            name: "",
            image: "",
          });
          setToggleForm(false);
          get();
        })
        .catch((err) => {
          console.log("err while updating", err);
        });
    } catch (error) {
      console.log("error while updating the album");
    }
  };

  //Get songs

  const getSongs = async () => {
    axios
      .get(`/api/album/${albumID}/songs`)
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        console.log("err while getting all the songs");
      });
  };

  useEffect(() => {
    if (albumID) {
      getSongs();
    }
  }, [albumID]);

  return (
    <div>
      <Head>
        <title>Spotify Glitter</title>
        {/* add new meta tags everywhere for seo */}
        {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        {/* add new meta tags everywhere for seo */}
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div
          className={`fixed top-10 left-[10%] xl:left-[14%] -z-10 text-5xl md:text-6xl lg:text-8xl xl:text-[7rem] 2xl:text-[9rem] ${rubik.className} tracking-wide text-[#D7E9B9] drop-shadow-[0_1px_5px_#FF7B54] cursor-pointer`}
        >
          <h1>Spotify</h1>
          <h1 className="mt-5 indent-10">Glitter</h1>
        </div>
        <div className="mt-[23rem] sm:mt-[25rem] md:mt-[27rem] 2xl:mt-[29rem] z-50 flex flex-col items-center">
          <Canvas>
            {loading ? (
              <div className="flex justify-center">
                <RiLoader3Line className="w-8 h-8 animate-spin text-[#FF7B54]" />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <BiRefresh
                      onClick={() => {
                        setEffect(true);
                        get();
                        getSongs();
                      }}
                      className={`${
                        effect && "animate-spin-up"
                      } cursor-pointer bg-[#444141]/40 hover:bg-[#444141]/70 rounded-full`}
                      size={25}
                      onAnimationEnd={() => setEffect(false)}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <AiOutlineEdit
                      className="cursor-pointer text-[#D7E9B9] hover:text-[#FF7B54]"
                      size={23}
                      onClick={() => {
                        setToggleForm(!toggleForm);
                      }}
                    />
                    <button
                      onClick={() => {
                        onDelete(Number(details?.id));
                        get();
                      }}
                      className="bg-[#444141]/40 hover:bg-red-500/80 px-4 py-1 rounded-md"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
                {toggleForm && (
                  <div>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        submitHandler(form);
                        get();
                      }}
                      className="mb-12 flex flex-col md:flex-row justify-between gap-4"
                    >
                      <input
                        type="text"
                        placeholder={details?.name as string}
                        name="name"
                        value={form.name as string}
                        onChange={onChangeHandler}
                        className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
                      />
                      <input
                        type="text"
                        placeholder={details?.image as string}
                        name="image"
                        value={form.image as string}
                        onChange={onChangeHandler}
                        className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
                      />
                      <Button title="Update" type="submit" />
                    </form>
                  </div>
                )}
                <div className="md:flex items-end gap-8 mb-16">
                  <img
                    src={details?.image as string}
                    alt={details?.name as string}
                    className="md:w-60 md:h-60 drop-shadow-[0_2px_10px_#1f2937] rounded-sm object-cover object-center"
                  />
                  <div className="text-left">
                    <p className="font-medium text-sm">ALBUM</p>
                    <p className="text-6xl font-bold mt-2">{details?.name}</p>
                    <div className="flex items-center text-zinc-400 mt-8 mb-2">
                      <p>{moment(details?.createdAt).fromNow()}</p>
                      <BsDot /> <p>{songs?.length} songs</p>
                    </div>
                  </div>
                </div>
                <Songs songs={songs} getSongs={getSongs} />
              </div>
            )}
          </Canvas>
        </div>
      </main>
    </div>
  );
};

export default AlbumDetails;
