import {
  Divider,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  TableContainer as TableCon,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ListItem,
  List,
  useTheme,
  Link,
  useMediaQuery,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import {
  FacebookOutlined,
  Twitter,
  GitHub,
  Google,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
// import { Link } from "react-router-dom"

const TableContainer = styled(TableCon)({
  overflowX: "auto", // Enable horizontal scrolling for small screens
  maxWidth: "100%", // Make the table container responsive
});

export const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Set breakpoint for mobile screens

  return (
    <Box>
      <Toolbar
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Typography variant="h6">
          Get Connected with Us on All Social Networks
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <IconButton>
            <FacebookOutlined />
          </IconButton>
          <IconButton>
            <Twitter />
          </IconButton>
          <IconButton>
            <GitHub />
          </IconButton>
          <IconButton>
            <Google />
          </IconButton>
          <IconButton>
            <Instagram />
          </IconButton>
          <IconButton>
            <LinkedIn />
          </IconButton>
        </Stack>
      </Toolbar>
      <Divider />
      <Toolbar>{isMobile ? <FooterTableSm /> : <FooterTableMd />}</Toolbar>
      <Box bgcolor="primary.main">
        <Toolbar
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Typography color="white.main">
            &copy;2022{" "}
            <Link
              href="https://linktr.ee/victorevogor"
              color="white.main"
              target="_blank"
              rel="noreferrer"
              underline="hover"
            >
              Victor Evogor
            </Link>
          </Typography>
        </Toolbar>
      </Box>
    </Box>
  );
};

const FooterTableSm = () => {
  return (
    <Stack>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        <Link href="/" underline="none">
          Mummy&apos;s Cake
        </Link>
      </Typography>
      <Typography variant="subtitle1">
        Satisfy your sweet tooth cravings with just a click - we&apos;ll deliver
        happiness right to your doorstep!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        Products
      </Typography>
      <List disablePadding dense>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            Birthday Cakes
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            Specialty Cakes
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            Wedding Cakes
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            CupCakes
          </Link>
        </ListItem>
      </List>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        Useful Links
      </Typography>
      <List disablePadding dense>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="tel:+2349133240345" underline="hover">
            +234 913 324 0345
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            Satellite Town Road II, Calabar Nigeria
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            info@mummyscake.com
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            Careers
          </Link>
        </ListItem>
      </List>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        Contact
      </Typography>
      <List disablePadding dense>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="tel:+2349133240345" underline="hover">
            +234 913 324 0345
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            Satellite Town Road II, Calabar Nigeria
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            info@mummyscake.com
          </Link>
        </ListItem>
        <ListItem
          sx={{
            px: 0,
          }}
        >
          <Link href="#" underline="hover">
            Careers
          </Link>
        </ListItem>
      </List>
    </Stack>
  );
};

const FooterTableMd = () => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              borderBottom: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Mummy&apos;s Cake
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              borderBottom: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
              align="right"
            >
              Products
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              borderBottom: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
              align="right"
            >
              Useful Links
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              borderBottom: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
              align="right"
            >
              Contact
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          sx={{
            verticalAlign: "initial",
          }}
        >
          <TableCell
            sx={{
              maxWidth: "8rem",
            }}
          >
            <Typography variant="subtitle1">
              Satisfy your sweet tooth cravings with just a click - we&apos;ll
              deliver happiness right to your doorstep!
            </Typography>
          </TableCell>
          <TableCell>
            <List disablePadding dense>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Birthday Cakes
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Specialty Cakes
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Wedding Cakes
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  CupCakes
                </Link>
              </ListItem>
            </List>
          </TableCell>
          <TableCell>
            <List disablePadding dense>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Pricing
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Settings
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Orders
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Help
                </Link>
              </ListItem>
            </List>
          </TableCell>
          <TableCell>
            <List disablePadding dense>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="tel:+2349133240345" underline="hover">
                  +234 913 324 0345
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Satellite Town Road II, Calabar Nigeria
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  info@mummyscake.com
                </Link>
              </ListItem>
              <ListItem
                sx={{
                  px: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link href="#" underline="hover">
                  Careers
                </Link>
              </ListItem>
            </List>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);
