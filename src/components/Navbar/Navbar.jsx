import { useState, useEffect } from "react";
import { createStyles, Navbar, Group, Image } from "@mantine/core";
import { IconUser, IconMapPin, IconHome, IconHomeCheck } from "@tabler/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import useWindowSize from "../../utils/useWindowSize";
import Header1 from "./Header";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const size = useWindowSize();

  // Css của thư viện
  const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
      navbar: {
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: theme.colors.violet[6],
        }).background,
      },

      version: {
        backgroundColor: theme.fn.lighten("#000", 0.1),
        color: theme.white,
        fontWeight: 700,
      },

      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${theme.fn.lighten("#fff", 0.1)}`,
        height: "56px",
      },

      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.fn.lighten("#fff", 0.1)}`,
      },

      link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        paddingLeft: "1rem",

        "&:hover": {
          backgroundColor: theme.fn.lighten("rgba(255, 255, 255, 0.192)", 0.1),
          color: "#fff",
        },
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor: theme.fn.lighten("rgba(255, 255, 255, 0.37)", 0.15),
          [`& .${icon}`]: {
            opacity: 0.9,
          },
        },
      },

      linkIcon: {
        ref: icon,
        color: theme.white,
        opacity: 0.7,
        marginRight: theme.spacing.sm,
      },
    };
  });

  //Data của navbar
  const data = [
    {
      link: "/admin/quanlynguoidung",
      label: "Quản Lý Người Dùng",
      icon: IconUser,
    },
    {
      link: "/admin/quanlythongtinvitri",
      label: "Quản Lý Thông Tin Vị Trí",
      icon: IconMapPin,
    },
    {
      link: "/admin/quanlythongtinphong",
      label: "Quản Lý Thông Tin Phòng",
      icon: IconHome,
    },
    {
      link: "/admin/quanlydatphong",
      label: "Quản Lý Đặt Phòng",
      icon: IconHomeCheck,
    },
  ];

  const { classes, cx } = useStyles();
  const [active, setActive] = useState("");

  //thay đổi đối tượng active khi navigate sang params khác
  useEffect(() => {
    setActive(location.pathname);
  }, [navigate]);

  //Khởi tạo HTML cho mỗi đối tượng của navbar
  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      href="#"
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      <Header1 active={active} setActive={setActive} />
      <div
        hidden={size.width < 1200 ? true : false}
        className={styles.navbar__container}
      >
        <Navbar
          height="100vh"
          width={{ sm: 240 }}
          p="0"
          className={styles.navbar}
        >
          <Navbar.Section grow>
            <Group className={classes.header} position="apart" bg="white">
              <Image src="./image/logo.png" alt="logo" width={150} className={styles.navbar__logo} />
            </Group>
            {links}
          </Navbar.Section>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
