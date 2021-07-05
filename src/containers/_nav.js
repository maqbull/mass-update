import React from 'react'
import axios from 'axios';
import CIcon from '@coreui/icons-react'


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  // SETUP PART
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup',
    route: '/setup',
    icon: "cilSettings",
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Enviroment',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/base/breadcrumbs',
      }  
      ,
      {
        _tag: 'CSidebarNavItem',
        name: 'Users Grant',
        to: '/setup/usergrant',
      }      
    ]},
  ,
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
   //  COMPONENT Human Resources 
   {
    _tag: 'CSidebarNavDropdown',
    name: 'Human Resources',
    route: '/base',
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'API1',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'API2',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'API3',
        to: '/base/breadcrumbs',
      }      
    ],
  },
    // COMPONENT Financials 
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Financials',
    route: '/base',
    icon: <CIcon name="cil-dollar" customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'API',
        to: '/base/breadcrumbs',
      }
    ],
  },
  //  COMPONENT Project Management 
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Project Management',
    route: '/custom',
    icon: <CIcon name="cil-spreadsheet" customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Update Projects',
        to: '/custom/simpleupdate',
      },
    ],
  },
   // COMPONENT Order Management 
   {
    _tag: 'CSidebarNavDropdown',
    name: 'Order Management',
    route: '/base',
    icon: <CIcon name="cil-graph" customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      }
    ],
  },
   
   // COMPONENT Procurement
   {
    _tag: 'CSidebarNavDropdown',
    name: 'Procurement',
    route: '/base',
    icon: <CIcon name="cil-basket" customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      }
    ],
  },
    // COMPONENT Inventory Management
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Inventory Management',
      route: '/base',
      icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Breadcrumb',
          to: '/base/breadcrumbs',
        }
      ],
    }
]

export default _nav
