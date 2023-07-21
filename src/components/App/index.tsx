import { useEffect } from 'react';
import { useFetchPostsQuery } from '../../redux/postsApi';
import SearchComponent from '../SearchComponent';
import TableComponent from '../TableComponent';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setAllPosts, setPosts } from '../../redux/slices/posts';
import PaginationComponent from '../PaginationComponent';
import { useTypedSelector } from '../../hooks/useTypedSelector';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading } = useFetchPostsQuery();
  const { currentPage, sortBy, sortMethod, search } = useTypedSelector((state) => state.posts);

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
}

export default App;
