import React from "react";
import { Chart as ReactChart } from "react-charts";
import { tw } from "twind";

export function Chart({ data }) {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.spice,
      hardMax: 100,
      hardMin: 0,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.taste,
        elementType: "bubble",
        hardMax: 100,
        hardMin: 0,
      },
    ],
    []
  );
  return (
    <>
      <div
        className={tw`relative top-1/2`}
        style={{ writingMode: "tb-rl", transform: "rotate(-180deg)" }}
      >
        Taste Level
      </div>
      <div className={tw`h-[50rem] ml-4`}>
        <ReactChart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            interactionMode: "closest",
            tooltip: {
              render: (tooltip) => {
                const datum = tooltip.focusedDatum?.originalDatum;

                return (
                  <div className={tw`shadow p-4 bg-white text-center`}>
                    <img
                      src={datum?.Img}
                      height="200px"
                      width={"200px"}
                      alt="picture of noodles"
                    />
                    <div className={tw`text-lg`}>
                      <strong>{datum?.name}</strong>
                    </div>
                    <div>
                      <strong>Taste:</strong> {datum?.taste?.toFixed(2)}
                    </div>
                    <div>
                      <strong>Spice:</strong> {datum?.spice?.toFixed(2)}
                    </div>
                    <div>
                      <strong>Packages Needed:</strong>{" "}
                      {datum?.size?.toFixed(2)}
                    </div>
                    <div>
                      <strong>Votes:</strong> {datum?.count}
                    </div>
                  </div>
                );
              },
            },
            getDatumStyle: (datum) => ({
              circle: { r: datum.originalDatum.size * 5 },
            }),
          }}
        />
      </div>
      <div className={tw`text-center`}>Spice Level</div>
    </>
  );
}
