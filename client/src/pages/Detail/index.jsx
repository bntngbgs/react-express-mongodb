import { Link, useParams } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

const Detail = () => {
  const [product, setProduct] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/products/${id}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setProduct(data);
        console.log(data);
      });
    // .then((data) => {

    // });
  }, [id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

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
            <td>Gambar</td>
            <td>: {product.image_url || '[tidak ada gambar]'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
