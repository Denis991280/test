import { useState, useEffect } from "react";
import axios from "axios";

export default function Axios() {

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
    axios.get('https://fakestoreapi.com/products')
    .then((responseData) => {
        // console.log(responseData)
        setItems(responseData.data) //.data nije proizvoljno
    })
    .catch((error) => console.log(error))

    //ili
    // try {
    //     const reposonse = await axios.get("https://fakestoreapi.com/products")
    //     setItems(reposonse.data) //.data nije proizvoljno
    // } catch (error) {
    //     console.log(error)
    // }
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const createNewProduct = {
        ...newProduct
    }

    try {
        axios.post("https://fakestoreapi.com/products", createNewProduct)
        .then(response => {
            setItems([response.data, ...items])
        })
    } catch (error) {
        console.log(error)
        
    }

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