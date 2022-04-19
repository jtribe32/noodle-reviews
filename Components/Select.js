import React, { useRef } from "react";
import useSelect from "use-select";
import { tw } from "twind";

export function Select({
  value,
  options,
  onChange,
  multi,
  pageSize = 10,
  itemHeight = 40,
}) {
  const optionsRef = useRef();

  const {
    visibleOptions,
    selectedOption,
    highlightedOption,
    getInputProps,
    getOptionProps,
    isOpen,
  } = useSelect({
    multi,
    options,
    value,
    onChange,
    optionsRef,
  });

  return (
    <div>
      <input
        {...getInputProps()}
        placeholder="Select one..."
        className={tw`border rounded w-[10rem]`}
      />
      <div>
        {isOpen ? (
          <div ref={optionsRef} className={tw`bg-white border border-gray-500`}>
            {!visibleOptions.length ? (
              <div>No options were found...</div>
            ) : null}
            {visibleOptions.map((option, i) => {
              return (
                <div
                  {...getOptionProps({
                    index: i,
                    option,
                    style: {
                      background: `${(props) =>
                        highlightedOption === option
                          ? "lightblue"
                          : selectedOption === option
                          ? "lightgray"
                          : "white"}`,
                    },
                  })}
                  className={tw`flex gap-2 items-center hover:(bg-blue-100)`}
                >
                  <img src={option.img} width="100px" />
                  {option.label}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
