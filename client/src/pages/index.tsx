import DefaultLayout from "@/layouts/default";
import { Link } from "react-router-dom";
import { productstore } from "@/store/product";
import { useEffect } from "react";
import Card from "@/components/cards";
import "../styles/home.css"
export default function IndexPage() {
  const { fetchproducts, products } = productstore();
  useEffect(() => {
    fetchproducts();
    // console.log(fetchproducts());
  }, [fetchproducts])
  // console.log(products);
  return (
    <DefaultLayout>
      <div>
        <h1 id="headmain" style={{ display: "flex", justifyContent: "center", fontSize: "150%", paddingBottom: "15px" }}>CURRENT PRODUCTS</h1>
      </div>
      <div className="containergrid"  >
        {
          products.map((product: any) => (
            <Card key={product._id} product={product} />
          ))
        } 
      </div>
      {products.length == 0 && (
        <div>
          <p style={{ display: "flex", justifyContent: "center", paddingTop: "100px" }}>No products found &#128531;<Link to={"/create"} style={{ textDecoration: "underline", paddingLeft: "10px", color: "red" }}>CREATE A PRODUCT </Link></p>
        </div>
      )}

    </DefaultLayout>
  );
}
