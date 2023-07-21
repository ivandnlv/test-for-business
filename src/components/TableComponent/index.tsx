import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { SortBy, setSort } from '../../redux/slices/posts';

import linePath from './line.svg';
import arrowDownPath from './arrow-down.svg';

interface ITableComponentProps {
  loading?: boolean;
}

const TableComponent = ({ loading = false }: ITableComponentProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { posts, sortMethod, sortBy } = useTypedSelector((state) => state.posts);

  const onFieldSort = (field: SortBy) => {
    if (field === sortBy) {
      dispatch(setSort({ sortBy: field, sortMethod: sortMethod === 'asc' ? 'dsc' : 'asc' }));
    } else {
      console.log('sds');
      dispatch(setSort({ sortBy: field, sortMethod: 'asc' }));
    }
  };

  const tableClassName = (field: SortBy): string => {
    if (sortBy === field && sortMethod === 'dsc') return 'table__head-sort _active';
    else return 'table__head-sort';
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__head-id">
            <span className="title">ID</span>
            <button className={tableClassName('id')} onClick={() => onFieldSort('id')}>
              <img src={sortBy === 'id' ? arrowDownPath : linePath} alt="sort" />
            </button>
          </th>
          <th className="table__head-title">
            <span className="title">Заголовок</span>
            <button className={tableClassName('title')} onClick={() => onFieldSort('title')}>
              <img src={sortBy === 'title' ? arrowDownPath : linePath} alt="sort" />
            </button>
          </th>
          <th className="table__head-description">
            <span className="title">Описание</span>
            <button className={tableClassName('body')} onClick={() => onFieldSort('body')}>
              <img src={sortBy === 'body' ? arrowDownPath : linePath} alt="sort" />
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
