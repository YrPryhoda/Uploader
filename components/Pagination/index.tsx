import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./style.module.scss";

interface IProps {
  total: number;
  href: string;
}

const Pagination = ({ total, href }: IProps) => {
  const router = useRouter();
  const [page, setNavPage] = useState(1);

  useEffect(() => {
    setNavPage(Number(router.query.page) || 1);
  }, [router.query.page]);

  const itemsPerPage = 4;
  const pagesCount = Math.ceil(total / itemsPerPage) || 1;

  const handlerPageChange = (newPage: number) => {
    if (newPage > pagesCount || newPage < 1 || newPage === page) {
      return;
    }

    setNavPage(newPage);
    router.push(`${href}${newPage}`);
  };

  const paginationItem = (value: number) => {
    return (
      <div
        key={value}
        onClick={() => handlerPageChange(value)}
        className={`${styles.container__item} ${
          value === page ? styles.active : ""
        }`}
      >
        {value}
      </div>
    );
  };

  const paginationList = Array(pagesCount)
    .fill(null)
    .map((_, index) => {
      return paginationItem(index + 1);
    });

  return (
    <div className={styles.container}>
      <div
        onClick={() => handlerPageChange(page - 1)}
        className={styles.container__item}
      >
        &#60;
      </div>
      {paginationList}
      <div
        className={styles.container__item}
        onClick={() => handlerPageChange(page + 1)}
      >
        &#62;
      </div>
    </div>
  );
};

export default Pagination;

