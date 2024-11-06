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

const Landing = () => {
  return (
    <>
      <ColorPalette>
        <Stack sx={{ bgcolor: "white.main" }}>
          <Container fixed style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Stack direction="column" spacing={2}>
              <Stack>
                <Typography variant={"h1"} color={"secondary"}>
                  Canisius Vanguard SDGS
                </Typography>
              </Stack>
              <Stack
                direction="row"
                width="100%"
                justifyContent={"space-evenly"}
                sx={{ opacity: 0.5 }}
              >
                <Stack
                  sx={{
                    bgcolor: "#e91d2d",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  1
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#cb9a28",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  2
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#2b9645",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  3
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#bf2032",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  4
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#ed412a",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  5
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#00a8d3",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  6
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#fbb614",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  7
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#8e1838",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  8
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#f16c24",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  9
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#df1a82",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  10
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#f79c25",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  11
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#cb8b2a",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  12
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#48773d",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  13
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#0177b5",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  14
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#40ad48",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  15
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#005387",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  16
                </Stack>
                <Stack
                  sx={{
                    bgcolor: "#1a3567",
                    width: "100%",
                    color: "transparent",
                  }}
                >
                  17
                </Stack>
              </Stack>
              <Stack>
                <Box sx={{ bgcolor: "primary.main", padding: "2rem" }}>
                  <Typography variant={"h3"} color={"secondary"}>
                    About
                  </Typography>
                  <Divider
                    sx={{ borderBottomColor: "secondary.main", my: "1rem" }}
                  />
                  <Typography cariant={"p"} color={"secondary"}>
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
        </Stack>
      </ColorPalette>
    </>
  );
};

export default Landing;
