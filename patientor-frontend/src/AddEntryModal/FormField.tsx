import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, FieldProps, FormikProps } from "formik";
import { useState } from "react";
import { Diagnose } from "../types";

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={placeholder}
        {...field}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

interface DateProps extends FieldProps {
  label: string;
}

export const DateField = ({ field, label }: DateProps) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <InputLabel>{label}</InputLabel>
      <Input type="date" fullWidth {...field} />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  name,
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  name: string;
  diagnoses: Diagnose[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";

  const onChange = (data: string[]) => {
    setSelectedDiagnoses([...data]);
    setFieldValue(field, selectedDiagnoses);
    setFieldTouched(field, true);
  };

  const stateOptions = diagnoses.map((diagnose) => ({
    key: diagnose.code,
    text: `${diagnose.name} (${diagnose.code})`,
    value: diagnose.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>{name}</InputLabel>
      <Select
        name={name}
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={name} />
      </Typography>
    </FormControl>
  );
};
