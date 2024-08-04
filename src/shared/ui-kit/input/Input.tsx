import TextField from '@mui/material/TextField';

interface InputProps {
  id: string;
  value: number | string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ id, value, onChange, type }: InputProps) {
  return (
    <TextField
      sx={{
        justifyContent: 'center'
      }}
      id={id}
      value={value}
      type={type}
      onChange={onChange}
      fullWidth
    />
  );
}
