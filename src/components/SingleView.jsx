// src/components/SingleView.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import AddToCart from './AddToCart';

export default function SingleView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return await response.json();
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    getProduct();
  }, [id]);

  if (!product) return <div className="loading-spinner"></div>;

  const { title, description, price, image } = product;

  return (
    <article className="center mw7 mw6-ns hidden ba mv4">
      <h1 className="f4 bg-near-black white mv0 pv2 ph3">{title}</h1>
      <div className="pa3 bt">
        <img src={image} alt={title} className="db w-100" />
        <p className="f6 f5-ns lh-copy measure mv0">{description}</p>
        <p className="f6 lh-copy measure mv2">${price}</p>
        <AddToCart product={product} />
      </div>
    </article>
  );
}
