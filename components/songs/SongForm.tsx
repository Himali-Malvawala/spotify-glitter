import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button/Button";

interface FormData {
  name: string;
  image: string;
}

const SongForm = ({ getSongs }: any) => {
  const [form, setForm] = useState<FormData>({ name: "", image: "" });
  const router = useRouter();
  const albumID = router?.query?.id;

  const create = async (form: FormData) => {
    try {
      await axios.post(`/api/album/${albumID}/songs`, form).then((res) => {
        setForm({ name: "", image: "" });
      });
    } catch (error) {
      console.log("error while creating song");
    }
  };

  const submitHandler = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log("error in handlesubmit create song", error);
    }
  };

  const onChangeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form
        onSubmit={(event: any) => {
          event.preventDefault();
          submitHandler(form);
          getSongs();
        }}
        className="mb-10 flex flex-col md:flex-row md:justify-between gap-4"
      >
        <input
          required
          name="name"
          type="text"
          placeholder="NAME"
          value={form?.name}
          onChange={onChangeHandler}
          className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
        />
        <input
          required
          name="image"
          type="text"
          placeholder="IMAGE"
          value={form?.image}
          onChange={onChangeHandler}
          className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
        />
        <Button title="Create 🎶" type="submit" />
      </form>
    </div>
  );
};

export default SongForm;
