import { Role } from '@jdesjardins/dist-lib';
import { PersonCircle } from 'react-bootstrap-icons';

interface Props {
  logout: () => void;
  role: Role;
}

export const UserDropdown = ({ logout }: Props) => {
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
          <a className="dropdown-item" href="index.js">
            New project...
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="index.js">
            Settings
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="index.js">
            Profile
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="dropdown-item btn-dark"
            type="button"
            onClick={logout}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};
