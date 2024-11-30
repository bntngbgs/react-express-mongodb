import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import linkLogo from ''
import './index.scss';

const Detail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8181/api/v2/products/${id}`)
      .then((result) => {
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

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
      {error && (
        <h2 className="error-message">{`${error.name}: ${error.message}`}</h2>
      )}
      {loading && <div className="loader"></div>}

      {!loading && (
        <table className="table">
          <tbody>
            <tr>
              <td>ID</td>
              <td>: {product._id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>: {product.name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>: {product.price}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>: {product.stock}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td className={product.status ? 'active' : 'unactive'}>
                : {product.status ? 'Active' : 'Unactive'}
              </td>
            </tr>
            <tr>
              <td>Gambar</td>
              <td>
                <span>: </span>
                {product.image_url ? (
                  <a
                    href={product.image_url}
                    target="_blank"
                    rel="noreferrer"
                    className="image-link"
                  >
                    <p>Link</p>
                    <img src="/external-link.png" alt="" />
                  </a>
                ) : (
                  '[tidak ada gambar]'
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Detail;
