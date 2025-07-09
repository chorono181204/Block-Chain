import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Auctions",
    newTab: false,
    path: "/auctions",
  },
  {
    id: 3,
    title: "Categories",
    newTab: false,
    path: "/categories",
  },
  {
    id: 4,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Account",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "My Account",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 62,
        title: "My Auctions",
        newTab: false,
        path: "/my-auctions",
      },
      {
        id: 63,
        title: "My Bids",
        newTab: false,
        path: "/my-bids",
      },
      {
        id: 64,
        title: "Watched Items",
        newTab: false,
        path: "/watched",
      },
      {
        id: 65,
        title: "Login",
        newTab: false,
        path: "/login",
      },
      {
        id: 66,
        title: "Register",
        newTab: false,
        path: "/register",
      },
    ],
  },
  {
    id: 7,
    title: "blogs",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 71,
        title: "Blog Grid with sidebar",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 72,
        title: "Blog Grid",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 73,
        title: "Blog details with sidebar",
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
      {
        id: 74,
        title: "Blog details",
        newTab: false,
        path: "/blogs/blog-details",
      },
    ],
  },
];
