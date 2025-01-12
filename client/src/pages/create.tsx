import { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import "../styles/create.css"
import DefaultLayout from "@/layouts/default";
import { productstore } from "../store/product.js";
import { Progress } from "@nextui-org/progress";
export default function create() {
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 30));
        }, 500);

        return () => clearInterval(interval);
    }, []);
    const [product, setproduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    function productname(event: any) {
        // let value = event.target.value;
        setproduct((input) => {
            return ({ ...input, [event.target.name]: event.target.value });
        });
    }

    const { createproduct } = productstore();
    async function handlesubmit(event: any) {
        setLoading(true);
        event.preventDefault();
        try {
            await createproduct(product);
            // const { success, message } = await createproduct(product);
            // console.log("success : " + success);
            // console.log("message : " + message);
            setproduct({ name: "", price: "", image: "" });
        } catch (error) {
            console.log(null);
        }finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }

    }
    const variants = "faded";
    return (
        <>
            <DefaultLayout>
                    <h1 className="heading">CREATE NEW PRODUCTS</h1>
                    <form action="" onSubmit={handlesubmit}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div className="w-full flex flex-col gap-2 max-w-[540px]">
                                <Input
                                    isRequired
                                    name="name"
                                    label="Name"
                                    placeholder="Enter product name"
                                    value={product.name}
                                    onChange={productname}
                                    variant={variants}
                                />
                                <Input
                                    isRequired
                                    name="price"
                                    label="Price"
                                    placeholder="Enter product price"
                                    value={product.price}
                                    onChange={(e: any) => setproduct({ ...product, price: e.target.value })}
                                    variant={variants}
                                />
                                <Input
                                    isRequired
                                    name="image"
                                    label="Image"
                                    placeholder="Enter image link"
                                    value={product.image}
                                    onChange={(e: any) => setproduct({ ...product, image: e.target.value })}
                                    variant={variants}
                                />
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <button style={{ border: "2px solid black", width: "50%", backgroundColor: "whitesmoke", color: "black", padding: "10px", margin: "10px", borderRadius: "20px", fontFamily: "sans-serif" }}>click me</button>
                                </div>
                                {loading && (
                                <Progress
                                    aria-label="Downloading..."
                                    size="md"
                                    value={value}
                                    color="success"
                                    showValueLabel={true}
                                    className="max-w-md"
                                />
                                )}
                            </div>
                        </div>
                    </form>
            </DefaultLayout>
        </>
    )
}