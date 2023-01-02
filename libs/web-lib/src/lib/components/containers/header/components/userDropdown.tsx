import { Role } from '@jdesjardins/dist-lib';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  logout: () => void;
  role: Role;
}

export const UserDropdown = ({ role, logout }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="dropdown text-end ms-3">
      <button
        className="d-block dropdown-toggle btn btn-link text-light opacity"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <PersonCircle size="32" />
      </button>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark m-0 text-small">
        <li>
          <button
            className="dropdown-item"
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>
        </li>
        {role === Role.ADMIN && (
          <li>
            <button
              className="dropdown-item"
              onClick={() => navigate('/admin')}
            >
              Admin
            </button>
          </li>
        )}
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" type="button" onClick={logout}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};
