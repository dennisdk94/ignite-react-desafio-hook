import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   // TODO
  // }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const allProducts:Product[] =  (await api.get('/products')).data;

      const formatedProductsPrice:ProductFormatted[] = allProducts.map((p:Product) => {
        const formatedValue = {
          id: p.id,
          title: p.title,
          price: p.price,
          priceFormatted: formatPrice(p.price),
          image: p.image
        }
        return formatedValue;
      })

      setProducts(formatedProductsPrice);
    }

    console.log('cart',cart)

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
    console.log('cart',cart)

  }

  return (
    <ProductList>
      {products.map((item) => (
        <li>
          <img src={item.image} alt={item.title} />
          <strong>{item.title}</strong>
          <span>{item.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(item.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {/* {cartItemsAmount[product.id] || 0} */} 2
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
   
    </ProductList>
  );
};

export default Home;
