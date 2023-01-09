import { IAccessToken, Role } from '@jdesjardins/dist-lib';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export interface NavItem {
  label: string;
  stub: string;
  guard?: Role[];
}

export const NavItemList = ({
  authenticatedUser,
  location,
}: {
  authenticatedUser: IAccessToken | undefined;
  location: string;
}) => {
  const navItems: NavItem[] = [
    {
      label: 'Home',
      stub: 'home',
    },
    {
      label: 'Projects',
      stub: 'projects',
      guard: [Role.USER, Role.ADMIN],
    },
    {
      label: 'About',
      stub: 'about',
    },
  ];

  const INDEX = navItems.length > 4 ? 3 : 4;

  const topnav = navItems.splice(0, INDEX);
  const more = navItems.splice(-INDEX);

  const navigate = useNavigate();

  return (
    <>
      {topnav
        .filter(
          (e) =>
            !e.guard ||
            (authenticatedUser && e.guard?.includes(authenticatedUser.role))
        )
        .map((navitem: NavItem) => {
          return (
            <Nav.Link
              key={navitem.stub}
              onClick={() => navigate(`/${navitem.stub}`)}
              active={location === navitem.stub}
            >
              {navitem.label}
            </Nav.Link>
          );
        })}
      {!!more.length && (
        <NavDropdown
          key="more_dropdown"
          title="More..."
          menuVariant="dark"
          active={more.some((e: NavItem) => e.stub === location)}
        >
          <NavDropdown.Header>More Options</NavDropdown.Header>
          {more.map((navItem: NavItem) => {
            return (
              <NavDropdown.Item
                key={navItem.stub}
                as="button"
                onClick={() => navigate(`/${navItem.stub}`)}
                active={location === navItem.stub}
              >
                {navItem.label}
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      )}
    </>
  );
};
