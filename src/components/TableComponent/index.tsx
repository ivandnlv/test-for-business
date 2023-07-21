import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import arrowDownPath from './arrow-down.svg';
import { SortBy, setSort } from '../../redux/slices/posts';

interface ITableComponentProps {
  loading?: boolean;
}

const TableComponent = ({ loading = false }: ITableComponentProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { posts, sortMethod } = useTypedSelector((state) => state.posts);

  const onFieldSort = (sortBy: SortBy) => {
    dispatch(setSort({ sortBy, sortMethod: sortMethod === 'asc' ? 'dsc' : 'asc' }));
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__head-id">
            <span className="title">ID</span>
            <button className="table__head-sort" onClick={() => onFieldSort('id')}>
              <img src={arrowDownPath} alt="sort" />
            </button>
          </th>
          <th className="table__head-title">
            <span className="title">Заголовок</span>
            <button className="table__head-sort" onClick={() => onFieldSort('title')}>
              <img src={arrowDownPath} alt="sort" />
            </button>
          </th>
          <th className="table__head-description">
            <span className="title">Описание</span>
            <button className="table__head-sort" onClick={() => onFieldSort('body')}>
              <img src={arrowDownPath} alt="sort" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {posts && posts.length ? (
          posts.map((post) => (
            <tr key={post.id}>
              <td className="text">{post.id}</td>
              <td className="text">{post.title}</td>
              <td className="text">{post.body}</td>
            </tr>
          ))
        ) : loading ? (
          <tr>
            <td colSpan={3} className="text" style={{ textAlign: 'center' }}>
              Данные загружаются...
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan={3} className="text" style={{ textAlign: 'center' }}>
              Данных нет
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
