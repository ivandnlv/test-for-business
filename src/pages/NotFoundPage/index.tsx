import { Link } from 'react-router-dom';
import notFoundPath from './404.png';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img src={notFoundPath} alt="not found" />
      <h1 className="title not-found__title">Такой страницы не существует</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
