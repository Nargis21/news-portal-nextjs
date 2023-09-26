import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery } from "@/redux/api/apiSlice";
import dynamic from 'next/dynamic'


const HomePage = ({ allNews }) => {
  // console.log(allNews);

  //redux data fetching
  const { data, error, isLoading } = useGetNewsesQuery()
  // console.log(data);

  //use loading state to component by nextjs dynamic and make it client side rendering
  const DynamicBanner = dynamic(() => import('@/components/UI/Banner'), {
    loading: () => <h1>Loading...</h1>,
    ssr: false
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
      <AllNews allNews={allNews}></AllNews>
    </>
  );
};
export default HomePage;

// using layout
HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

//data fetching with getServerSideProps ---SSR
export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/news')
  const data = await res.json()
  console.log(data);
  return {
    props: {
      allNews: data.data
    }
  }
}

//data fetching with getStaticProps ----SSG
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