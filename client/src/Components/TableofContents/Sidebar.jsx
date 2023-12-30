import React, {useEffect, useState} from 'react';
import * as FaIcons from 'react-icons/fa'; //for fontawesome icons
import * as AiIcons from 'react-icons/ai'; //for aiICons icons
import { Link, useNavigate } from 'react-router-dom';
// Anchor tags will reload the page and re-render all the components. While <Link> and <NavLink> 
// will only re-render updated components matched with the URL path of the Route without reloading. 
// It helps the Single-Page Applications to work faster while routing.
import { sidebarData } from './SidebarData';
import './Sidebar.css'
// import {IconContext} from 'react-icons';

function Sidebar(props) {
    
    const [sidebar, setSidebar] = useState(
        JSON.parse(sessionStorage.getItem('sidebar-is-open')) || false); // sidebar state initially set to false
    const showSidebar = () => {
        setSidebar(!sidebar); // function to toggle the state of the sidebar
    }
    const data = props.pages ? props.pages : sidebarData;

    const navigate = useNavigate();

    const navigateToChapter = (index) => {
        
        console.log(index);
        props.info.progress.current_index = index;
        navigate('../reader', {
            replace: true,
            state: {
            id: props.id,
            title: props.book,
            // chapter: chapter, 
            // toc: toc, 
            pages: data,
            index: index,
            book: props.info
            }
        });
        navigate(0);
    }

    useEffect(() => {
        sessionStorage.setItem('is-open', JSON.stringify(sidebar));
    }, [sidebar]);

    return (
        <div className='stickytableofcontents'> 
            <div className='navbar'>
                <div className="menu-bars"> 
                    <div className={sidebar ? 'zoom-vertical' : 'zoom-horizontal'}>
                        <FaIcons.FaBars onClick={showSidebar}/>
                        <AiIcons.AiOutlineZoomIn onClick={props.increaseFontSize}/>
                        <AiIcons.AiOutlineZoomOut onClick={props.decreaseFontSize}/>
                    </div>
                    {/* top left bar icon, a clickable react component */}
                </div>
            </div>
        <div className={sidebar ? 'scrollable-sidebar-active' : 'scrollable-sidebar'}>
            {/* Navbar */}
            

            {/* Nav Menu */}
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}> 
            {/* checks whether Nav-Menu is active or not */}
                <ul className='nav-menu-items' >
                <p className='Table-header'>Chapters</p>
                    {data.map((item, index) => {
                        return (
                            <li key={index} className="nav-text" onClick={() => {
                                navigateToChapter(index)
                            }}>
                                <span>{item.title || "-"}</span>
                                
                            </li>
                        )
                    })}
                </ul>
            
            </nav>
    </div>
    </div>
  )
}

export default Sidebar