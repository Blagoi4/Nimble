import TextField from "@mui/material/TextField";

interface InputProps {
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

export default function Input({ label, value, onChange, error, helperText }: InputProps) {
  return (
    <TextField
      sx={{
        justifyContent: "center",
      }}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
}
