import { useTypedSelector } from '../../hooks/useTypedSelector';
import arrowDownPath from './arrow-down.svg';

interface ITableComponentProps {
  loading?: boolean;
}

const TableComponent = ({ loading = false }: ITableComponentProps) => {
  const { posts } = useTypedSelector((state) => state.posts);

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__head-id">
            <span className="title">ID</span>
            <img src={arrowDownPath} alt="sort" />
          </th>
          <th className="table__head-title">
            <span className="title">Заголовок</span>
            <img src={arrowDownPath} alt="sort" />
          </th>
          <th className="table__head-description">
            <span className="title">Описание</span>
            <img src={arrowDownPath} alt="sort" />
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
            <td colSpan={3} className="text">
              Данные загружаются...
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan={3} className="text">
              Данных нет
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
