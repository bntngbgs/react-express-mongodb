import { useState, useEffect, useReducer } from 'react';
import Input from '../../components/Input';
import { useParams } from 'react-router-dom';

const errorReducer = (state, action) => {
  switch (action.type) {
    case 'nameError':
      return { ...state, nameError: [action.payload] };
    case 'priceError':
      return { ...state, priceError: [action.payload] };
    case 'stockError':
      return { ...state, stockError: [action.payload] };
    default:
      throw new Error('Error in reducer');
  }
};

const Edit = () => {
  const [state, dispatch] = useReducer(errorReducer, {
    nameError: '',
    priceError: '',
    stockError: '',
    imageDefault: '',
  });
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    image_url: '',
    status: false,
  });

  let { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/products/${id}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product.name === '') {
      dispatch({
        type: 'nameError',
        payload: 'Nama field must be filled...',
      });
    } else {
      state.nameError = '';
    }
    if (product.price === '') {
      dispatch({
        type: 'priceError',
        payload: 'Price field must be filled...',
      });
    } else {
      state.priceError = '';
    }
    if (product.stock === '') {
      dispatch({
        type: 'stockError',
        payload: 'Stock field must be filled...',
      });
    } else {
      state.stockError = '';
    }

    if (product.name && product.price && product.stock) {
      fetch(`http://127.0.0.1:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then(() => {
        window.location.replace('/');
      });
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={product.name}
            error={state.nameError}
            onChange={(e) => {
              state.nameError = '';
              setProduct((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={product.price}
            error={state.priceError}
            onChange={(e) => {
              state.priceError = '';
              setProduct((prevState) => ({
                ...prevState,
                price: e.target.value,
              }));
            }}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="stock"
            value={product.stock}
            error={state.stockError}
            onChange={(e) => {
              state.stockError = '';
              setProduct((prevState) => ({
                ...prevState,
                stock: e.target.value,
              }));
            }}
          />
          <Input
            name="image_url"
            type="text"
            placeholder="Link Gambar..."
            label="image"
            value={product.image_url}
            error={state.imageDefault}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                image_url: e.target.value,
              }))
            }
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={product.status}
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                status: e.target.checked,
              }));
            }}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
