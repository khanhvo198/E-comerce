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



const Filter = (props) => {
    const { header, onChangeFilter, title, fields } = props
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <div>
            <Navbar color="white" light expand="md">
                <NavbarBrand href="/">{header}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {title}
                            </DropdownToggle>
                            <DropdownMenu right>
                                {fields.map((field) => (
                                    <DropdownItem onClick={() => onChangeFilter(field)}>
                                        {field}
                                    </DropdownItem>
                                ))}
                                {/* <DropdownItem onClick={() => onChangeFilter(true)}>
                                    Low to High
                                </DropdownItem>
                                <DropdownItem onClick={() => onChangeFilter(false)}>
                                    High to Low
                                </DropdownItem> */}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    )
}


export default Filter