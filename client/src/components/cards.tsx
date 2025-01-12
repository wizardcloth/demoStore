import { Input } from "@nextui-org/input";
import { productstore } from "@/store/product";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { useState } from "react";

interface Product {
    [x: string]: any;
    _id: any;
    name: string;
    image: string;
    price: number;
}

interface CardProps {
    product: Product;
}
export default function CardComponent({ product }: CardProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { deleteproduct, updateproduct } = productstore();
    async function handledelete(_id: any) {
        await deleteproduct(_id);
        // console.log(_id);
    }
    
    const update = async (_id: any,updatedproduct: Product)=>{
        await updateproduct(_id,updatedproduct);
    }

    const [updatedproduct, setupdatedproducts] = useState(product);
    return (
        <div>
                <Card key={product._id} shadow="sm" isPressable style={{width:"100%"}}>
                    <CardBody className="overflow-visible p-0">
                        <img
                            width="100%"
                            alt={product.name}
                            className="w-full object-cover h-[140px]"
                            src={product.image} />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>Price</b>
                        <p className="text-default-500">${product.price}</p>
                    </CardFooter>
                    <div>
                        <i onClick={() => { handledelete(product._id); }} className="fa-solid fa-trash" style={{ padding: "10px" }}></i>
                        <i onClick={onOpen} className="fa-solid fa-pen-to-square" style={{ padding: "10px" }}></i>
                    </div>
                </Card>
            
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="center"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">EDIT</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            onChange={(e)=>setupdatedproducts({...updatedproduct,image:e.target.value})}
                                            // value={updatedproduct.image}
                                            variant={"bordered"}
                                            placeholder="Enter image" />

                                    </ModalBody>
                                    <ModalFooter>
                                        <button onClick={onClose}>
                                            EXIT
                                        </button>
                                        <button onClick={() => update(product._id,updatedproduct) }>
                                            SUBMIT
                                        </button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
        </div >
    );
}
