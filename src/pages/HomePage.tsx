import { useEffect } from 'react';
import { useFetchPostsQuery } from '../redux/postsApi';
import SearchComponent from '../components/SearchComponent';
import TableComponent from '../components/TableComponent';
import PaginationComponent from '../components/PaginationComponent';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setAllPosts, setCurrentPage, setPosts } from '../redux/slices/posts';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useNavigate, useParams } from 'react-router-dom';

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading } = useFetchPostsQuery();
  const { currentPage, sortBy, sortMethod, search } = useTypedSelector((state) => state.posts);

  const navigate = useNavigate();

  let { page = '1' } = useParams<string>();

  useEffect(() => {
    dispatch(setCurrentPage(Number(page)));
  }, [page]);

  useEffect(() => {
    navigate(`/posts/${currentPage}`);
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      dispatch(setAllPosts(data));
      dispatch(setPosts());
    }
  }, [data]);

  useEffect(() => {
    dispatch(setPosts());
  }, [currentPage, sortBy, sortMethod]);

  useEffect(() => {
    if (data) {
      dispatch(setAllPosts(data));
      dispatch(setPosts());
      dispatch(setCurrentPage(1));
    }
  }, [search]);

  return (
    <div className="app">
      <header className="header">
        <SearchComponent />
      </header>
      <main className="main">
        <div className="wrapper">
          <TableComponent loading={isLoading} />
        </div>
      </main>
      <footer className="footer">
        <PaginationComponent />
      </footer>
    </div>
  );
};

export default HomePage;
