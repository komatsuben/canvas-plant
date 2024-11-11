import React from "react";
import {
  Button,
  Container,
  Stack,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ColorPalette from "../Components/ColorPalette";
import CustomCarousel from "../Components/CustomCarousel";

const Home = () => {
  const color = [
    "#e91d2d",
    "#cb9a28",
    "#2b9645",
    "#bf2032",
    "#ed412a",
    "#00a8d3",
    "#fbb614",
    "#8e1838",
    "#f16c24",
    "#df1a82",
    "#f79c25",
    "#cb8b2a",
    "#48773d",
    "#0177b5",
    "#40ad48",
    "#005387",
    "#1a3567",
  ];

  return (
    <>
      <ColorPalette>
        <Stack sx={{ bgcolor: "white.main" }}>
          <Stack
            sx={{
              height: "95vh",
              background:
                "url(https://placehold.jp/2560x1206.png) fixed no-repeat center",
            }}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Container fixed>
              <Stack justifyContent={"center"} direction={"row"}>
                <Typography
                  variant={"h1"}
                  fontSize={{ xs: "3rem", md: "5rem" }}
                  color={"secondary"}
                  textAlign={"center"}
                >
                  Canisius Vanguard SDGs
                </Typography>
              </Stack>
              <Stack
                direction="row"
                width="100%"
                justifyContent={"space-evenly"}
                sx={{ opacity: 0.5 }}
                height="2vh"
              >
                {color.map((color) => (
                  <Stack
                    flexGrow={1}
                    flexDirection={'row'}
                    sx={{
                      bgcolor: color,
                      width: "100%",
                      color: "transparent",
                      backgroundSize: "cover",
                    }}
                    key={color.toString()}
                  >

                  </Stack>
                ))}
              </Stack>
            </Container>
          </Stack>

          <Container fixed sx={{ my: "2%" }}>
            <Stack direction="column" spacing={2}>
              <Stack>
                <Box sx={{ bgcolor: "transparent", padding: "2rem" }}>
                  <Typography variant={"h3"} color={"secondary"}>
                    About
                  </Typography>
                  <Divider
                    sx={{ borderBottomColor: "secondary.main", my: "1rem" }}
                  />
                  <Typography cariant={"p"} color={"primary"}>
                    "On the other hand, we denounce with righteous indignation
                    and dislike men who are so beguiled and demoralized by the
                    charms of pleasure of the moment, so blinded by desire, that
                    they cannot foresee the pain and trouble that are bound to
                    ensue; and equal blame belongs to those who fail in their
                    duty through weakness of will, which is the same as saying
                    through shrinking from toil and pain. These cases are
                    perfectly simple and easy to distinguish. In a free hour,
                    when our power of choice is untrammelled and when nothing
                    prevents our being able to do what we like best, every
                    pleasure is to be welcomed and every pain avoided. But in
                    certain circumstances and owing to the claims of duty or the
                    obligations of business it will frequently occur that
                    pleasures have to be repudiated and annoyances accepted. The
                    wise man therefore always holds in these matters to this
                    principle of selection: he rejects pleasures to secure other
                    greater pleasures, or else he endures pains to avoid worse
                    pains."
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Container>
          <Stack bgcolor={"primary.main"}>
            <Container fixed>
              <Stack>
                <Typography variant={"h3"} textAlign={"center"} my={5} color={"secondary"}>Promotions</Typography>
              </Stack>
              <Stack>
                <CustomCarousel />
              </Stack>
            </Container>
          </Stack>
        </Stack>
      </ColorPalette>
    </>
  );
};

export default Home;
