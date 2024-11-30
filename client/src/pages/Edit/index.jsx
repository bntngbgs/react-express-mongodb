import { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    fetch(`https://react-express-mongodb-tau.vercel.app/api/v2/products/${id}`)
      .then((result) => {
        if (!result.ok) {
          throw new Error('something wrong with the network');
        }

        return result.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
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
      fetch(
        `https://react-express-mongodb-tau.vercel.app/api/v2/products/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        }
      )
        .then(() => {
          enqueueSnackbar('Produk berhasil di update', {
            variant: 'info',
            autoHideDuration: 2000,
          });
          navigate('/');
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="main">
      {error && (
        <h2 className="error-message">{`${error.name}: ${error.message}`}</h2>
      )}
      {loading && <div className="loader"></div>}

      {!loading && !error && (
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
      )}
    </div>
  );
};

export default Edit;
