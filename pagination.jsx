import { useEffect, useState } from "react";
import "./styles.css";

//render products
//apply pagination
//disable/enable arrow buttons
//highlight active current page button

const PAGE_LIMIT = 10;

const ProductCard = ({ title, img }) => {
  return (
    <div className="product-card">
      <img src={img} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default function App() {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=200");
    const data = await res.json();
    setProductsList(data?.products ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productsTotalCount = productsList.length;
  const noOfPages = Math.ceil(productsTotalCount / PAGE_LIMIT);
  const start = currentPage * PAGE_LIMIT;
  const end = start + PAGE_LIMIT;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevPage = () => setCurrentPage((prev) => prev - 1);
  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="pagination-container">
        <button
          onClick={goToPrevPage}
          className="page-number"
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {Array(noOfPages)
          .keys()
          .map((nOfPg) => (
            <button
              onClick={() => handlePageChange(nOfPg)}
              className="page-number"
              key={nOfPg}
            >
              {nOfPg + 1}
            </button>
          ))}
        <button
          onClick={goToNextPage}
          className="page-number"
          disabled={currentPage === noOfPages - 1}
        >
          Next
        </button>
      </div>
      <div className="products-container">
        {productsList.slice(start, end).map((p) => {
          return <ProductCard key={p.id} img={p.thumbnail} title={p.title} />;
        })}
      </div>
    </div>
  );
}
