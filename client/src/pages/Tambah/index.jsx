import { useReducer, useState } from 'react';
import Input from '../../components/Input';
import './index.scss';

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

const Tambah = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    image_url: '',
    status: false,
  });
  const [state, dispatch] = useReducer(errorReducer, {
    nameError: '',
    priceError: '',
    stockError: '',
    imageDefault: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product.name === '') {
      dispatch({ type: 'nameError', payload: 'Nama tidak boleh kosong' });
    } else {
      state.nameError = '';
    }
    if (product.price === '') {
      dispatch({
        type: 'priceError',
        payload: 'Harga tidak boleh kosong',
      });
    } else {
      state.priceError = '';
    }
    if (product.stock === '') {
      dispatch({
        type: 'stockError',
        payload: 'Stock tidak boleh kosong',
      });
    } else {
      state.stockError = '';
    }

    // console.log(error);
    if (product.name && product.price && product.stock) {
      fetch(`http://127.0.0.1:8080/api/products/`, {
        method: 'POST',
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
        <h2>Tambah Produk</h2>
        <br />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
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
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
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
            placeholder="Image URL..."
            label="Image URL (boleh kosong)"
            error={state.imageDefault}
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                image_url: e.target.value,
              }));
            }}
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

export default Tambah;
