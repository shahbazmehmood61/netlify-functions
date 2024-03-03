import Mapbox from "@/components/Map/Mapbox";
import Todo from "@/components/Todo/Index";

async function Index() {
  return (
    <>
      <main className="p-5 w-[100%] h-screen">
        {/* <Mapbox /> */}
        <Todo />
      </main>
    </>
  );
}

export default Index;
