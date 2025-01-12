import { create } from "zustand";

export const productstore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createproduct: async (newproduct) => {
        if (!newproduct.name || !newproduct.price || !newproduct.image) {
            return alert("Please provide all fields");
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newproduct)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(data);
            set((state) => {
                const updatedProducts = [...state.products, data.message];
                // console.log(updatedProducts); // Log the updated products array
                return { products: updatedProducts };
            });
            return { success: true, message: "Created product" };
        } catch (error) {
            console.error("Error:", error);
            return { success: false, message: "Failed to create product" };
        }

    },
    fetchproducts: async () => {
        const res = await fetch("/api/products");
        // console.log(res);
        const data = await res.json();
        // console.log(data); 
        set({ products: data.message });
    },
    deleteproduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        set(click =>
            ({ products: click.products.filter(product => product._id !== id) })
        );
        console.log(data);
    },
    updateproduct : async (id,updatedproduct) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedproduct),
            });
            const data = await res.json();
            console.log(data);
            set((state)=>({
                products:state.products.map((product)=>(product._id === id ? data.message : product))
            }))
            // console.log(updatedproduct);
            // console.log('Product updated:', data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }    

}))