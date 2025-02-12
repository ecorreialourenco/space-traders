import { Layout, SpaceMap } from "@/components";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col h-full justify-center items-center">
        <SpaceMap />
      </div>
    </Layout>
  );
}
