import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button/Button";

interface FormData {
  name: String;
  image: String;
}

const AlbumForm = ({ get }: any) => {
  const [form, setForm] = useState<FormData>({ name: "", image: "" });
  const router = useRouter();

  const refresh = () => {
    router.replace(router.asPath);
  };

  const create = (form: FormData) => {
    try {
      axios.post("/api/album", form).then(() => {
        setForm({ name: "", image: "" });
      });
    } catch (error) {
      console.log("error while developing an album");
    }
  };

  const submitHandler = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log("error in handle submit");
    }
  };

  const onChangeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        submitHandler(form);
        get();
      }}
      className="mb-16 flex flex-col md:flex-row md:justify-between gap-4"
    >
      <input
        type="text"
        placeholder="Name"
        required
        name="name"
        value={form?.name as string}
        onChange={onChangeHandler}
        className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
      />
      <input
        type="text"
        placeholder="Image link"
        required
        name="image"
        value={form?.image as string}
        onChange={onChangeHandler}
        className="flex-grow px-2 py-3 rounded-lg focus:outline-none focus:border-[#FFD56F] focus:ring-[#FFD56F] focus:ring-1 shadow-2xl"
      />

      <Button title="Create Album" type="submit" />
    </form>
  );
};

export default AlbumForm;
