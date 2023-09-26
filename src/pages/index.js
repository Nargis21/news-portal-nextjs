import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery } from "@/redux/api/apiSlice";
import dynamic from 'next/dynamic'


const HomePage = ({ allNews }) => {
  // console.log(allNews);

  const { data, error, isLoading } = useGetNewsesQuery()
  console.log(data);

  const DynamicBanner = dynamic(() => import('@/components/UI/Banner'), {
    loading: () => <h1>Loading...</h1>,
  })

  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicBanner />
      <AllNews allNews={data}></AllNews>
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/news')
  const data = await res.json()
  return {
    props: {
      allNews: data
    }
  }
}

// export const getStaticProps = async () => {
//   const res = await fetch('http://localhost:5000/news')
//   const data = await res.json()
//   return {
//     props: {
//       allNews: data
//     },
//     revalidate: 10
//   }
// }