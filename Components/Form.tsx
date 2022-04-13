import { useForm, useField } from "react-form";
import React from "react";
import { tw } from "twind";
import moment from "moment";
import { useRouter } from "next/router";

export function Form() {
  const router = useRouter();
  const { Form: NoodlesForm } = useForm({
    onSubmit: async (values) => {
      console.log(values);
      setIsSubmitted(true);

      const now = new Date();
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          timeStamp: moment(now).format("YYYY-MM-DD HH:mm"),
        }),
      });

      if (response) {
        router.replace(router.asPath);
      }
      setIsSubmitted(false);
    },
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <>
      <div className={tw`text-xl`}>Submit Your Vote!</div>
      <div className={tw`h-2`} />
      <NoodlesForm>
        <div className={tw`flex gap-2`}>
          <label> Name</label>
          <Field type="text" field="name" isSubmitted={isSubmitted} />
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
          <label>Size</label>
          <Field type="number" field="size" isSubmitted={isSubmitted} />
        </div>
        <div className={tw`h-2`} />
        <button
          className={tw`px-4 py-2 bg-blue-500 text-white rounded hover:(opacity-80)`}
        >
          Submit
        </button>
      </NoodlesForm>
    </>
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
