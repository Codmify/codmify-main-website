import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";

type Direction = "row-reverse" | "row";
type ProjectLink = { label: string; url: string };

interface ProjectCardProps {
  title: string;
  desc: string;
  additionDesc: string;
  img: string;
  url: string;
  reverse: Direction;
  images?: string[];
  links?: ProjectLink[];
}

export default function ProjectCard({
  title,
  desc,
  additionDesc,
  img,
  reverse,
  url,
  images,
  links,
}: ProjectCardProps) {
  return (
    <Box
      p={{ xs: 2, md: 3.5 }}
      border="1px solid #E0E8EF"
      borderRadius={{ xs: 3, md: 4 }}
      bgcolor="white"
      boxShadow="0 12px 30px rgba(18,18,121,.06)"
    >
      <Grid
        container
        spacing={{ xs: 3, md: 5 }}
        direction={reverse}
        alignItems="center"
      >
        <Grid item lg={7} md={7} sm={7} xs={12}>
          <Box sx={styles.cardImg}>
            {images ? (
              <Box sx={styles.appPreviews}>
                {images.map((image, index) => (
                  <Box key={image} sx={styles.appPreview}>
                    <Image
                      src={image}
                      alt={`${title} app preview ${index + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Image
                src={img}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={12}>
          <Stack spacing={2}>
            {/* <Typography
              color="#008DE5"
              fontWeight={700}
              fontSize={12}
              letterSpacing={1.2}
            >
              SELECTED PROJECT
            </Typography> */}
            <Typography
              component="h3"
              fontSize={{ xs: 28, md: 35 }}
              lineHeight={1.1}
              color="#121279"
              fontWeight={700}
            >
              {title}
            </Typography>
            <Typography color="#526573" lineHeight={1.75}>
              {desc}
            </Typography>
            {additionDesc && (
              <Typography color="#526573" lineHeight={1.75}>
                {additionDesc}
              </Typography>
            )}
            <Stack direction="row" flexWrap="wrap" gap={1} pt={1}>
              {links ? (
                links.map((link) => (
                  <Button
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    key={link.url}
                    variant="outlined"
                    endIcon={<GoArrowRight />}
                    sx={styles.btnOutlined}
                  >
                    {link.label}
                  </Button>
                ))
              ) : (
                <Button
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  endIcon={<GoArrowRight />}
                  sx={{ width: "fit-content", px: 2.25 }}
                >
                  Visit project
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  cardImg: {
    width: "100%",
    height: { lg: 360, md: 330, sm: 300, xs: 280 },
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    background: "#EAF3FA",
  },
  appPreviews: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: 1, md: 2 },
    px: { xs: 2, md: 4 },
    background: "linear-gradient(135deg, #58B9E1, #1C92C7)",
  },
  appPreview: {
    height: "90%",
    width: "45%",
    position: "relative",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 14px 25px rgba(0,0,0,.25)",
    backgroundColor: "#58B9E1",
  },
  btnOutlined: {
    width: "fit-content",
    color: "#121279",
    borderColor: "#BFCFDD",
    px: 1.5,
    "&:hover": { borderColor: "#121279", bgcolor: "#F2F7FB" },
  },
};
