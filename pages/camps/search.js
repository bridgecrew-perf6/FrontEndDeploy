import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import RequestItem from "../../components/BloodCamps";
import qs from "qs";
import BloodCamps from "../../components/BloodCamps";
export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/requests">Previous Page</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events === 0 && <h1>No Such Camp</h1>}

      {events.map((evt) => (
        <BloodCamps key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { Name_contains: term },
        { Address_contains: term },
        { Description_contains: term },
        { ContactNumber_contains: term },
      ],
    },
  });
  const res = await fetch(`${API_URL}/blood-donation-camps?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
