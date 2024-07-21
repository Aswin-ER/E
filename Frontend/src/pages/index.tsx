import Navbar from "@/components/navbar";
import ProductsCards from "@/components/featuredProductListCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <ProductsCards />
    </div>
  );
}
