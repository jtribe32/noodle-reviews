import { useForm, useField } from "react-form";
import React from "react";
import { tw } from "twind";
import axios from "axios";
import { useRouter } from "next/router";
import SelectField from "./SelectField.js";

export function Form({ data }) {
  const router = useRouter();
  const { Form: NoodlesForm } = useForm({
    onSubmit: async (values) => {
      setIsSubmitted(true);
      const realValues = {
        ...values,
        size: Number(values.size),
        spice: Number(values.spice),
        taste: Number(values.taste),
      };
      const res = await axios.post("/api/entry", realValues);

      if (res) {
        router.replace(router.asPath);
      }
    },
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const noodleOptions = data.map((noodle) => {
    return { label: noodle.name, value: noodle.name, img: noodle.Img };
  });

  return (
    <div>
      <div className={tw`text-xl`}>Submit Your Vote!</div>
      <div className={tw`h-2`} />
      <NoodlesForm>
        <div className={tw`flex gap-2`}>
          <label> Noodles</label>
          <SelectField
            options={noodleOptions}
            field="name"
            isSubmitted={isSubmitted}
          />
        </div>
        <div className={tw`h-2`} />
        <div className={tw`flex gap-2`}>
          <label>Taste</label>
          <Field
            type="number"
            field="taste"
            min="0"
            max="100"
            isSubmitted={isSubmitted}
          />
        </div>
        <div className={tw`h-2`} />
        <div className={tw`flex gap-2`}>
          <label>Spice</label>
          <Field
            type="number"
            field="spice"
            min="0"
            max="100"
            isSubmitted={isSubmitted}
          />
        </div>
        <div className={tw`h-2`} />
        <div className={tw`flex gap-2`}>
          <label>Packages Needed</label>
          <Field type="number" field="size" isSubmitted={isSubmitted} />
        </div>
        <div className={tw`h-2`} />
        <button
          className={tw`px-4 py-2 bg-blue-500 text-white rounded hover:(opacity-80)`}
        >
          Submit
        </button>
      </NoodlesForm>
    </div>
  );
}

export function Field({ field, type, isSubmitted, ...rest }) {
  const { getInputProps, value, setValue } = useField(field);
  React.useEffect(() => {
    if (isSubmitted) {
      setValue("");
    }
  }, [isSubmitted]);

  return (
    <>
      <input
        {...getInputProps()}
        type={type}
        {...rest}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className={tw`border rounded w-[10rem]`}
      />
    </>
  );
}
