"use client";

import { faqs } from "@/constants/policies";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import Reveal from "./motion/Reveal";

export default function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        bgcolor: "#f9fafb"
      }}>
      <Container maxWidth="lg">
        <Reveal>
        <Stack
          spacing={2}
          sx={{
            mb: 6,
            alignItems: "center",
            textAlign: "center"
          }}>
          <Typography variant="h3" sx={{
            fontWeight: 700
          }}>
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 600
            }}>
            Got questions? We&apos;ve got answers. Browse through our most commonly
            asked questions.
          </Typography>
        </Stack>
        </Reveal>
        <Reveal delay={0.1}>
        <Stack
          spacing={2}
          sx={{
            maxWidth: 900,
            mx: "auto"
          }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "8px !important",
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: "0 !important",
                  mb: 2,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore size={24} />}
                sx={{
                  minHeight: 64,
                  "&.Mui-expanded": {
                    minHeight: 64,
                  },
                  "& .MuiAccordionSummary-content": {
                    my: 2,
                    "&.Mui-expanded": {
                      my: 2,
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 18
                  }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7
                  }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
