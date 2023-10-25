import { useState, useEffect } from "react";
import axios from "axios";

export default function Async() {

  const [items, setItems] = useState(null);
  const [newProduct, setNewProduct] = useState({                    
  title: 'test product',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic'})

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
        const reposonse = await fetch("https://fakestoreapi.com/products")
        const storedData = await reposonse.json()
        setItems(storedData)
    } catch (error) {
        console.log(error)
    }

  }

  const handleChange = (e) => {
    const keyName = event.target.id;
    const incomingValue = event.target.value;

    setNewProduct((prevNewProduct) => {
        return {
            ...prevNewProduct, [keyName]: incomingValue
        }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const createNewProduct = {
        ...newProduct
    }

    fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(createNewProduct),
            headers: {"Content-Type":"application/json"}
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            .catch(error=>console.log(error))
  }

  return (
    <div className="products">
        <form onSubmit={handleSubmit}>
        <label>Title: 
            <input type="text" id="title" onChange={handleChange} />
        </label><br />

        <label>Description: 
            <input type="text" id="description" onChange={handleChange} />
        </label><br />

        <label>Category: 
            <input type="text" id="category" onChange={handleChange} />
        </label><br />

        <label>Price: 
            <input type="text" id="price" onChange={handleChange} />
        </label><br />

        <label>Image: 
            <input type="text" id="image" onChange={handleChange} />
        </label><br />

        <button>Submit</button>
        </form>

    {
      !items ? <h1>Loading...</h1> :
      items.map((element) => {
      return (
        <div className="cards"> 
          <h1>{element.title}</h1>
          <img src={element.image} alt={element.title} />
          <p>{element.description}</p>
        </div>
      )
    })}
    
  </div>
  )
}