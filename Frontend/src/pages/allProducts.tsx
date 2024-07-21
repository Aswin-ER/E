import Navbar from "@/components/navbar";
import AllProductsCards from "@/components/allProductListCards";

export default function AllProduct() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AllProductsCards />
    </div>
  );
}
