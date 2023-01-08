import { Role } from '@jdesjardins/dist-lib';
import { Dropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  logout: () => void;
  role: Role;
  location: string;
}

export const UserDropdown = ({ location, role, logout }: Props) => {
  const navigate = useNavigate();

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        className="btn-link text-light opacity ms-3"
        variant="link"
        size="sm"
      >
        <PersonCircle size="32" />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item
          as="button"
          active={location === 'profile'}
          onClick={() => navigate('/profile')}
        >
          Profile
        </Dropdown.Item>
        {role === Role.ADMIN && (
          <Dropdown.Item
            as="button"
            active={location === 'admin'}
            onClick={() => navigate('/admin')}
          >
            Admin
          </Dropdown.Item>
        )}
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={logout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
