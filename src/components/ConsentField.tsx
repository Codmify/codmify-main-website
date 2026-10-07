"use client";
import { Box, Checkbox, FormHelperText } from "@mui/material";
import Link from "next/link";
import { useId } from "react";

export default function ConsentField({ checked, onChange, disabled, error }: {
  checked: boolean; onChange: (checked: boolean) => void; disabled: boolean; error?: string;
}) {
  const id = useId();
  return <Box>
    <Box component="label" sx={{ display: "flex", alignItems: "center", gap: .5, cursor: disabled ? "default" : "pointer", color: "#526573", fontSize: ".875rem", lineHeight: 1.6 }}>
      <Checkbox name="consent" required checked={checked} disabled={disabled} onChange={event => onChange(event.target.checked)} slotProps={{ input: { "aria-invalid": Boolean(error), "aria-describedby": error ? id : undefined } }} sx={{ flexShrink: 0, minWidth: 44, minHeight: 44, p: 1 }} />
      <Box component="span">I agree to Codmify’s <Box component="span" sx={{ whiteSpace: "nowrap" }}><Link href="/terms-and-conditions" style={{ color: "#121279", textDecoration: "underline" }}>terms and conditions</Link><span aria-hidden="true">{"\u00a0*"}</span></Box></Box>
    </Box>
    {error && <FormHelperText error id={id}>{error}</FormHelperText>}
  </Box>;
}
