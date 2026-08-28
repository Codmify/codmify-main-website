import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiCompass, FiHeart, FiZap } from "react-icons/fi";

const values = [
  { title: "Built around outcomes", description: "We focus on the business result first, then choose the right technology and design to achieve it.", icon: FiCompass, color: "#008DE5" },
  { title: "Clear, collaborative delivery", description: "You get a thoughtful partner, practical advice and visibility from first conversation to launch.", icon: FiHeart, color: "#E15C8E" },
  { title: "Quality that keeps moving", description: "We build useful digital products that are fast, maintainable and ready for what comes next.", icon: FiZap, color: "#00A990" },
];

export default function Content() {
  return (
    <>
      <Box
        sx={{
          py: { xs: 7, md: 11 },
          backgroundImage: "radial-gradient(circle at 5% 25%, rgba(0,141,229,.09), transparent 22rem)"
        }}>
        <Container maxWidth="lg"><Stack spacing={2} sx={{
          maxWidth: 760
        }}>
          <Typography
            sx={{
              color: "#008DE5",
              fontWeight: 700,
              letterSpacing: 1.2
            }}>WHO WE ARE</Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 31, md: 44 },
              lineHeight: 1.12,
              color: "#121279",
              fontWeight: 700
            }}>A digital partner for businesses ready to do more online.</Typography>
          <Typography
            sx={{
              color: "#526573",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.8
            }}>Codmify brings strategy, design and technology together to help ambitious organisations show up clearly, work more efficiently and grow with confidence. We make digital feel less complicated—and far more useful.</Typography>
        </Stack>
        <Grid container spacing={2.5} sx={{
          mt: { xs: 3, md: 5 }
        }}>
          {["Practical strategy", "Human-centred design", "Reliable delivery"].map((item) => <Grid
            key={item}
            size={{
              xs: 12,
              sm: 4
            }}><Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              p: 2,
              border: "1px solid #E0E8EF",
              borderRadius: 3,
              bgcolor: "white"
            }}><FiCheckCircle color="#008DE5" /><Typography
            sx={{
              fontWeight: 700,
              color: "#121279"
            }}>{item}</Typography></Stack></Grid>)}
        </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          bgcolor: "#F1F7FC"
        }}>
        <Container maxWidth="lg">
        <Typography
          sx={{
            color: "#008DE5",
            fontWeight: 700,
            letterSpacing: 1.2
          }}>WHAT GUIDES US</Typography>
        <Typography
          component="h2"
          sx={{
            color: "#121279",
            fontSize: { xs: 29, md: 40 },
            fontWeight: 700,
            mt: 1
          }}>The way we work matters.</Typography>
        <Grid container spacing={3} sx={{
          mt: 2
        }}>{values.map((value) => { const Icon = value.icon; return (
          <Grid
            key={value.title}
            size={{
              xs: 12,
              md: 4
            }}><Stack
              spacing={2}
              sx={{
                height: "100%",
                p: 3,
                bgcolor: "white",
                borderRadius: 4,
                border: "1px solid #E0E8EF"
              }}><Box
              sx={{
                width: 48,
                height: 48,
                display: "grid",
                placeItems: "center",
                borderRadius: 3,
                bgcolor: `${value.color}15`,
                color: value.color
              }}><Icon size={24} /></Box><Typography
              variant="h6"
              sx={{
                color: "#121279",
                fontWeight: 700
              }}>{value.title}</Typography><Typography
              sx={{
                color: "#526573",
                lineHeight: 1.7
              }}>{value.description}</Typography></Stack></Grid>
        ); })}</Grid>
        </Container>
      </Box>
      <Box sx={{
        py: { xs: 7, md: 10 }
      }}><Container maxWidth="lg"><Grid container spacing={{ xs: 4, md: 8 }} sx={{
        alignItems: "center"
      }}><Grid
        size={{
          xs: 12,
          md: 7
        }}><Typography
        sx={{
          color: "#008DE5",
          fontWeight: 700,
          letterSpacing: 1.2
        }}>OUR PROMISE</Typography><Typography
        component="h2"
        sx={{
          color: "#121279",
          fontSize: { xs: 30, md: 42 },
          lineHeight: 1.15,
          fontWeight: 700,
          mt: 1
        }}>Good digital work should make life easier.</Typography><Typography
        sx={{
          color: "#526573",
          lineHeight: 1.8,
          mt: 2
        }}>Whether we are launching a new website, designing a product, integrating AI or improving operations, we bring the same care: understand the real need, keep communication clear and deliver work that earns its place in your business.</Typography><Link href="/hire-us"><Button variant="contained" size="large" endIcon={<FiArrowRight />} sx={{ mt: 3, px: 3 }}>Start a project</Button></Link></Grid><Grid
        size={{
          xs: 12,
          md: 5
        }}><Stack
        spacing={2}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          bgcolor: "#121279",
          color: "white"
        }}><Typography
        sx={{
          fontSize: { xs: 31, md: 42 },
          lineHeight: 1,
          fontWeight: 700
        }}>One team.<br />Many possibilities.</Typography><Typography sx={{
        color: "rgba(255,255,255,.78)"
      }}>From first ideas to stronger systems, we are here to help you make the next move count.</Typography></Stack></Grid></Grid></Container></Box>
    </>
  );
}
