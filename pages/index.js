import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React from "react";
import db from "../utils/db";
import { tw } from "twind";
import { Form } from "../Components/Form.tsx";
import { Chart } from "../Components/Chart";

export const getStaticProps = async () => {
  const entries = await db
    .collection("entries")
    .orderBy("created", "desc")
    .get();
  const data = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data(),
  }));

  const results = {};

  data?.forEach((row) => {
    if (row.name) {
      if (!results[row.name]) {
        results[row.name] = { ...row, count: 1 };
      } else {
        results[row.name].taste += row.taste;
        results[row.name].spice += row.spice;
        results[row.name].size += row.size;
        results[row.name].count += 1;
      }
    }
  });

  return {
    props: {
      data: Object.values(results).map((row) => {
        return {
          ...row,
          taste: row.taste / row.count,
          spice: row.spice / row.count,
          size: row.size / row.count,
        };
      }),
    },
    revalidate: 10,
  };
};

export default function Home({ data }) {
  const chartData = React.useMemo(
    () =>
      data.map((d) => {
        return { label: d.name, data: [d] };
      }),
    [data]
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
          <h1 className={tw`text-2xl`}>Let the Best Noodles Win!</h1>
        </div>

        <div className={tw`h-4`} />
        <div className={tw`h-[50rem]`}>
          {data ? <Chart data={chartData} /> : <div>Loading...</div>}
        </div>
        <div className={tw`h-4`} />
        <Form />
      </main>
    </div>
  );
}
