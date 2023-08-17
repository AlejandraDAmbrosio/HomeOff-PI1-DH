import React, { useState } from 'react'
import listadoProductosData from "../ListadoProductos.json";

const ProductList = () => {

const [products, setProducts] = useState([]);
const [productsXPage, setProductsXPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);


const getProductList =() =>{
    const res = listadoProductosData;
    console.log("listadoProductosData capturado -  cantidad de registros")
    console.log(res.length)

}


  return (
    <div>ProductList</div>
  )
}

export default ProductList