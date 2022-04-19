import * as React from "react";
import { useField, splitFormProps } from "react-form";

import { Select } from "./Select";

//

export default React.forwardRef(function SelectField(
  { onChange, ...props },
  ref
) {
  const [field, formProps, rest] = splitFormProps(props);
  const {
    setValue,
    value,
    setMeta,
    meta: { error, isTouched },
  } = useField(field, formProps);

  const renderProps = {
    clearable: false,
    ...rest,
    value: value || [],
    error: isTouched && error,
    onChange: (value) => {
      setValue(value);
      if (onChange) {
        onChange(value);
      }
    },
    onBlur: () => {
      setMeta({ isTouched: true });
    },
  };

  return <Select ref={ref} {...renderProps} />;
});
