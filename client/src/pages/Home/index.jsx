import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import './index.scss';

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetch('https://react-express-mongodb-services.vercel.app/api/v2/products/')
      .then((result) => {
        if (!result.ok) {
          throw new Error(`${result.status} ${result.statusText}`);
        }
        return result.json();
      })
      .then((data) => {
        setProductData(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [productData.length]);

  const handleDelete = (e, id) => {
    fetch(
      `https://react-express-mongodb-services.vercel.app/api/v2/products/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() =>
      enqueueSnackbar('Produk berhasil di hapus', {
        variant: 'warning',
        autoHideDuration: 2000,
      })
    );

    let productFilter = productData.filter((item) => item._id !== id);

    setProductData(productFilter);
  };

  const currencyFormat = (int) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
      .format(int)
      .replace(',00', '');
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading && <div className="loader"></div>}
      {error && (
        <h2 className="error-message">{`${error.name}: ${error.message}`}</h2>
      )}

      <table className="table">
        {!loading && !error && (
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
        )}

        <tbody>
          {productData &&
            !error &&
            productData
              .filter((item) => {
                return searchQuery.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(searchQuery);
              })
              .map((data, index) => {
                index += 1;
                return (
                  <tr key={data._id}>
                    <td>{index}</td>
                    <td>{data.name}</td>
                    <td className="text-center">
                      {currencyFormat(data.price)}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/detail/${data._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Detail
                      </Link>
                      <Link
                        to={`/edit/${data._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => {
                          handleDelete(e, data._id);
                        }}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {productData.length < 1 && !loading && !error && (
        <h2 className="no-product">Belum ada produk</h2>
      )}
    </div>
  );
};

export default Home;
