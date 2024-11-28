import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.scss';

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/products/')
      .then((result) => {
        if (!result.ok) {
          throw new Error(`Error: ${result.statusText}`);
        }

        return result.json();
      })
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  });

  const handleDelete = (e, id) => {
    fetch(`http://127.0.0.1:8080/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {error && <tr>{error.message}</tr>}
          {productData &&
            productData.map((data, index) => {
              index += 1;
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{data.name}</td>
                  <td className="text-right">{data.price}</td>
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
    </div>
  );
};

export default Home;
