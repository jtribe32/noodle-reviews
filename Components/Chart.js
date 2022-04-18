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
                <div className={tw`text-lg`}>
                  <strong>{datum?.name}</strong>
                </div>
                <div>
                  <strong>Taste:</strong> {datum?.taste}
                </div>
                <div>
                  <strong>Spice:</strong> {datum?.spice}
                </div>
                <div>
                  <strong>Size:</strong> {datum?.size}
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
  );
}
