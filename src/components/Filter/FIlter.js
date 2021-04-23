import React, { useState } from 'react';
import {
    Collapse,
    Nav, Navbar,
    NavbarBrand,
    NavbarText, NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';



const Filter = ({onChangeFilter}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Filter by</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Price
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={() => onChangeFilter(true)}>
                                    Low to High
                                </DropdownItem>
                                <DropdownItem onClick={() => onChangeFilter(false)}>
                                    High to Low
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    )
}


export default Filter