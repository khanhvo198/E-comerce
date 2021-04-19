import React from 'react';
import PropTypes from 'prop-types';
import { ImProfile } from 'react-icons/im';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './SideBar.scss'

SideBar.propTypes = {

};

SideBar.defaultProps = {
    // sideItems: [
    //     // {
    //     //     icon: <ImProfile size={30} />,
    //     //     title: 'My Profile',
    //     //     link: 'http://localhost:3000/account/profile',
    //     // },
    //     // {
    //     //     icon: <AiOutlineShoppingCart size={30} />,
    //     //     title: 'My Order',
    //     //     link: 'http://localhost:3000/account/order',
    //     // },
    // ]
}

function SideBar(props) {
    const { sideItems } = props
    return (
        <div className='sidebar'>
            {sideItems.map((item, index) => (
                <div className='sideitem'>
                    <Link className='sideitem__link' to={item.link}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default SideBar;