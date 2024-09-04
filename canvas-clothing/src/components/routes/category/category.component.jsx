import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./category.styles.scss";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../../store/categories/category.selector";
import { ProductCard } from "../../product-card/product-card.component";

export const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};
