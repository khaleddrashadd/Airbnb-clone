import { Container, Logo, Navigation, UserMenu } from '..';

const Header = ({currentUser}) => {
  console.log(currentUser);
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm border-b-1">
      <div className="border-b-1 py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Navigation />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </header>
  );
};
export default Header;
