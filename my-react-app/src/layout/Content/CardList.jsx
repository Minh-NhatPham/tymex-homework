import { Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import CardItem from "../../components/CardItem";
import "./CardList.css";
import { AUTO_REFRESH_API } from "../../constants";
import useFetch from "../../hooks/useFetch";
import { customFetch } from "../../utils/customFetch";
import { filterItems, sortItems } from "../../utils/utils";

function CardList({ filters, sort: sortOption }) {
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const timerRef = useRef();

  const { error, loading, response } = useFetch({ url: "/products", params: { page } }, [page], {
    autoRefresh: true,
    shouldFetch: true,
  });

  useEffect(() => {
    if (response) {
      const { data, totalPage } = response;
      setList([...list, ...data]);
      if (totalPage <= page) {
        setShowLoadMore(false);
      }
    }
  }, [response]);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(async () => {
      const response = await customFetch({ url: "/products", params: { page, refresh: true } });
      setList(response.data);
    }, AUTO_REFRESH_API);
    return () => clearInterval(timerRef.current);
  }, [page]);

  const handleLoadMore = async (e) => {
    e.preventDefault();
    setPage((p) => p + 1);
  };
  if (error) {
    return <>Sorry, some thing went wrong</>;
  }
  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="card-list__container">
          {sortItems(filterItems(list, filters), sortOption).map((item, index) => (
            <CardItem item={item} key={"card-item-" + index} />
          ))}
        </div>
      )}
      {showLoadMore ? (
        <div className="load-more-product">
          <button onClick={handleLoadMore} disabled={loading}>
            Load more
          </button>
        </div>
      ) : (
        <div className="no-product">You've seen all the products</div>
      )}
    </>
  );
}

export default CardList;
