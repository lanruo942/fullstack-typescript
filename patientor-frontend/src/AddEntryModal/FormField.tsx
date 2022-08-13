import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import {
  ErrorMessage,
  FieldProps,
  FormikProps,
  useField,
  FieldHookConfig,
} from "formik";
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

interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}

export const NumberField = ({
  field,
  label,
  min,
  max,
  setFieldValue,
  setFieldTouched,
}: NumberProps) => {
  const [value, setValue] = useState<number | "">(0);

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          let value = +e.target.value;
          if (value === undefined || isNaN(value) || e.target.value === "") {
            setValue("");
            setFieldValue(field.name, undefined);
            return;
          }
          if (value > max) value = max;
          else if (value <= min) value = min;
          else value = Math.round(value);
          setValue(value);
          setFieldValue(field.name, value);
          setFieldTouched(field.name, true);
        }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export interface TypeOption {
  value: string;
  label: string;
}

interface TypesFieldProps {
  label: string;
  options: TypeOption[];
  typeChange: (type: string) => void;
}

export const TypesField = ({
  label,
  options,
  typeChange,
  ...props
}: TypesFieldProps & FieldHookConfig<string>) => {
  const [field] = useField(props);
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth
        style={{ marginBottom: "0.5em" }}
        label={label}
        {...field}
        onChange={(e): void => typeChange(e.target.value as string)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label || option.value}
          </MenuItem>
        ))}
      </Select>
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

  const onChange = (data: string[]) => {
    setSelectedDiagnoses([...data]);
    setFieldValue(name, data);
    setFieldTouched(name, true);
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
