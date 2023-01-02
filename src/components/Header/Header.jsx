import { useState, useEffect } from "react";
import {
  createStyles,
  Group,
  Header,
  Container,
  Avatar,
  Popover,
  Text,
} from "@mantine/core";
import { IconUser, IconMapPin, IconHome, IconHomeCheck } from "@tabler/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import useWindowSize from "../../utils/useWindowSize";
import { logout } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import nguoidungAPI from "../../services/nguoidungAPI";

const Header1 = ({ active, setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, count } = useSelector((state) => state.auth);
  const size = useWindowSize();
  const [avatar, setAvatar] = useState("");
  const [nguoiDung, setNguoiDung] = useState({});
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const data = await nguoidungAPI.getThongTinNguoiDungTheoId(
          user.user.id
        );
        setAvatar(data.avatar);
        setNguoiDung(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [count]);

  const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
      linkIcon: {
        ref: icon,
        color: theme.white,
        opacity: 0.7,
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor: theme.fn.lighten("rgba(255, 255, 255, 0.37)", 0.15),
          [`& .${icon}`]: {
            opacity: 0.9,
          },
        },
      },

      inner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,
      },

      links: {
        width: 260,
        [theme.fn.smallerThan("sm")]: {
          width: "auto",
        },
        visibility: size.width < 1200 ? "visible" : "hidden",
      },

      social: {
        width: 260,

        [theme.fn.smallerThan("sm")]: {
          width: "auto",
          marginLeft: "auto",
        },
      },

      linkHeader: {
        display: "block",
        lineHeight: 1,
        padding: "8px 10px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.white,
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
          backgroundColor: theme.fn.lighten("rgba(255, 255, 255, 0.192)", 0.1),
          color: "#fff",
        },
      },
    };
  });

  const data = [
    {
      link: "/admin/quanlynguoidung",
      label: "Quản lý người dùng",
      icon: IconUser,
    },
    {
      link: "/admin/quanlythongtinvitri",
      label: "Quản lý thông tin vị trí",
      icon: IconMapPin,
    },
    {
      link: "/admin/quanlythongtinphong",
      label: "Quản lý thông tin phòng",
      icon: IconHome,
    },
    {
      link: "/admin/quanlydatphong",
      label: "Quản lý đặt phòng",
      icon: IconHomeCheck,
    },
  ];

  const { classes, cx } = useStyles();

  useEffect(() => {
    setActive(location.pathname);
  }, [navigate]);

  const linkHeaders = data.map((item) => (
    <a
      className={cx(classes.linkHeader, {
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
    </a>
  ));
  return (
    <>
      <Header height={55} mb={120} className={styles.header}>
        <Container size="xl" className={classes.inner}>
          <Group className={classes.links} spacing={4}>
            {linkHeaders}
          </Group>

          <Group spacing={0} className={classes.social} position="right" noWrap>
            <Popover width="target" position="bottom" shadow="md">
              <Popover.Target>
                <Group width={200}>
                  <Text
                    fw={600}
                    color="white"
                    p={4}
                    style={{ border: "2px solid white", borderRadius: "10px" }}
                  >
                    {nguoiDung ? nguoiDung.name : user ? user.user.name : ""}
                  </Text>
                  <Avatar
                    radius="xl"
                    size={40}
                    src={avatar ? avatar : user ? user.user.avatar : null}
                    className={styles.header__avatar}
                  />
                </Group>
              </Popover.Target>
              <Popover.Dropdown className={styles.header}>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setActive("");
                    navigate("/admin");
                  }}
                  className={classes.linkHeader}
                >
                  Sửa thông tin
                </a>

                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(logout());
                  }}
                  className={classes.linkHeader}
                >
                  Đăng xuất
                </a>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Container>
      </Header>
    </>
  );
};

export default Header1;
