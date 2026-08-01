import { teams } from "@/utils/teams";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FiLinkedin } from "react-icons/fi";

export default function OurTeam() {
  return (
    <Box component="section" py={{ xs: 7, md: 10 }} bgcolor="#121279" color="white">
      <Container maxWidth="lg"><Stack alignItems="center" textAlign="center" spacing={1.5} maxWidth={680} mx="auto" mb={{ xs: 4, md: 6 }}><Typography color="#51C4FF" fontWeight={700} letterSpacing={1.2}>THE PEOPLE BEHIND CODMIFY</Typography><Typography component="h2" fontSize={{ xs: 31, md: 43 }} lineHeight={1.12} fontWeight={700}>A close-knit team that cares about the details.</Typography><Typography color="rgba(255,255,255,.75)">We combine specialist thinking with a shared commitment to delivering work that makes a difference.</Typography></Stack>
        <Grid container spacing={3} justifyContent="center">{teams.map((member) => <Grid item xs={12} sm={6} md={3} key={member.name}><Stack height="100%" border="1px solid rgba(255,255,255,.16)" borderRadius={4} overflow="hidden" bgcolor="rgba(255,255,255,.06)" sx={{ transition: "transform .25s ease, background .25s ease", "&:hover": { transform: "translateY(-6px)", bgcolor: "rgba(255,255,255,.11)" }, "&:hover img": { transform: "scale(1.04)" } }}><Box position="relative" height={270} overflow="hidden"><Image src={member.img} alt={member.name} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover", transition: "transform .35s ease" }} /></Box><Stack p={2.25} spacing={0.5} flexGrow={1}><Typography fontWeight={700} fontSize={18}>{member.name}</Typography><Typography color="#A9DFFF" variant="body2">{member.role}</Typography><Box mt="auto" pt={2}><Box component="a" href={member.url} target="_blank" rel="noreferrer" display="inline-flex" alignItems="center" gap={0.75} color="white" sx={{ fontSize: 14, fontWeight: 700, "&:hover": { color: "#51C4FF" } }}><FiLinkedin /> Connect</Box></Box></Stack></Stack></Grid>)}</Grid>
      </Container>
    </Box>
  );
}
