import { useEffect } from 'react';
import { useFetchPostsQuery } from '../../redux/postsApi';
import SearchComponent from '../SearchComponent';
import TableComponent from '../TableComponent';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setPosts } from '../../redux/slices/posts';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading } = useFetchPostsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    }
  }, [data]);

  return (
    <div className="app">
      <SearchComponent />
      <div className="wrapper">
        <TableComponent loading={isLoading} />
      </div>
    </div>
  );
}

export default App;
