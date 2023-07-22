import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/posts';

const PaginationComponent = () => {
  const dispatch: AppDispatch = useDispatch();

  const { postsCount, postsPerPage, currentPage } = useTypedSelector((state) => state.posts);

  const [pages, setPages] = useState<number[] | null>(null);
  const [maxPage, setMaxPage] = useState<number>(0);

  useEffect(() => {
    if (postsCount) {
      let pagesArr: number[] = [];
      for (let i = 1; i <= Math.ceil(postsCount / postsPerPage); i++) {
        pagesArr.push(i);
      }
      setPages(pagesArr);
      setMaxPage(pagesArr.length);
    } else {
      setPages(null);
    }
  }, [postsCount]);

  const onPageClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.target instanceof HTMLButtonElement) {
      dispatch(setCurrentPage(Number(e.target.textContent)));
    }
  };

  const onNextPageClick = () => {
    if (currentPage !== maxPage) {
      dispatch(setCurrentPage(currentPage + 1));
    } else {
      dispatch(setCurrentPage(1));
    }
  };

  const onPrevPageClick = () => {
    if (currentPage !== 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      dispatch(setCurrentPage(maxPage));
    }
  };

  if (!pages || pages.length === 1) return null;

  return (
    <div className="pagination">
      <button className="pagination__button" onClick={onPrevPageClick}>
        Назад
      </button>
      <div className="pagination__pages">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={(e) => onPageClick(e)}
            className={
              pageNumber === currentPage
                ? 'pagination__pages-item _active'
                : 'pagination__pages-item'
            }>
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="pagination__button" onClick={onNextPageClick}>
        Далее
      </button>
    </div>
  );
};

export default PaginationComponent;
