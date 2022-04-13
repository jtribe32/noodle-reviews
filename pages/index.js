import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Chart } from "react-charts";
import React from "react";
import { google } from "googleapis";
import { tw } from "twind";
import { Form } from "../Components/Form.tsx";

// export async function getServerSideProps() {
//   const auth = await google.auth.getClient({
//     scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//   });

//   const sheets = google.sheets({ version: "v4", auth });

//   const range = `Sheet1!R2C1:R1000C7`;

//   const response = await sheets.spreadsheets.values.get({
//     spreadsheetId: process.env.SHEET_ID,
//     range,
//   });

//   const data = response.data.values?.map((row) => {
//     return {
//       label: row[1],
//       data: [
//         {
//           Timestamp: row[0],
//           Name: row[1],
//           Taste: Number(row[2]),
//           Spice: Number(row[3]),
//           Size: Number(row[4]),
//           count: 1,
//         },
//       ],
//     };
//   });

//   const results = {};

//   data?.forEach((row) => {
//     if (row.label) {
//       if (!results[row.label]) {
//         results[row.label] = row;
//       } else {
//         results[row.label].data[0].Taste += row.data[0].Taste;
//         results[row.label].data[0].Spice += row.data[0].Spice;
//         results[row.label].data[0].Size += row.data[0].Size;
//         results[row.label].data[0].count += 1;
//       }
//     }
//   });

//   return {
//     props: {
//       data: Object.values(results).map((row) => {
//         return {
//           ...row,
//           data: row.data.map((data) => {
//             return {
//               ...data,
//               Spice: data.Spice / data.count,
//               Taste: data.Taste / data.count,
//               Size: data.Size / data.count,
//             };
//           }),
//         };
//       }),
//     },
//   };
// }

export default function Home({ data }) {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.Spice,
      hardMax: 100,
      hardMin: 0,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.Taste,
        elementType: "bubble",
        hardMax: 100,
        hardMin: 0,
      },
    ],
    []
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>Noodle Reviews</title>
        <meta name="description" content="Let the best noodles win" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={tw`h-4`} />
        <div className={tw`flex gap-2 items-center`}>
          <h1 className={tw`text-2xl`}>Let the Best Noodles Win!!</h1>
          <a
            href="https://docs.google.com/spreadsheets/d/1K3WzWs3j3otUZtbSC2zcATwANqg7RqJ5xppmTkcMoKY/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className={tw`px-4 py-2 bg-blue-500 text-white rounded hover:(opacity-90)`}
            >
              View Data
            </button>
          </a>
        </div>

        <div className={tw`h-4`} />
        <div className={tw`h-[50rem]`}>
          <Chart
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
                        <strong>{datum?.Name}</strong>
                      </div>
                      <div>
                        <strong>Taste:</strong> {datum?.Taste}
                      </div>
                      <div>
                        <strong>Spice:</strong> {datum?.Spice}
                      </div>
                      <div>
                        <strong>Size:</strong> {datum?.Size}
                      </div>
                      <div>
                        <strong>Votes:</strong> {datum?.count}
                      </div>
                    </div>
                  );
                },
              },
              getDatumStyle: (datum) => ({
                circle: { r: datum.originalDatum.Size * 5 },
              }),
            }}
          />
        </div>
        <div className={tw`h-4`} />
        <Form />
      </main>
    </div>
  );
}
