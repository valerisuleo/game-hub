import { useCounter } from "src/app/views/exercises/working-with-context/context/counter";

const NavbarComponent = () => {
    const { value } = useCounter();

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Navbar | {value}
                </a>
            </div>
        </nav>
    );
};

export default NavbarComponent;
