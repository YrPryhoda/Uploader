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
      if (pagesCount > 7) {
        if (index === 0 || index + 1 === pagesCount) {
          return paginationItem(index + 1);
        }
        if (page === index + 1) {
          return paginationItem(index + 1);
        }

        if (index + 2 === page || index === page) {
          return paginationItem(index + 1);
        }

        if (index + 3 === page || index - 1 === page) {
          return (
            <span className={styles.container__skip} key={index + 1}>
              ...
            </span>
          );
        }

        if (index > 1 && index < pagesCount - 2) {
          return null;
        }
      }
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

