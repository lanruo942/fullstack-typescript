import { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useStateValue } from "../state";
import { EntryFormValues, EntryType } from "../types";
import {
  DateField,
  DiagnosisSelection,
  TextField,
  TypeOption,
  TypesField,
  NumberField,
} from "./FormField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: EntryType.HealthCheck, label: "Health Check" },
];

const baseInitialValues = {
  date: "",
  specialist: "",
  description: "",
  diagnosisCodes: undefined,
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [initialValues, setInitialValues] = useState<EntryFormValues>({
    type: EntryType.Hospital,
    ...baseInitialValues,
    discharge: {
      date: "",
      criteria: "",
    },
  });
  const [{ diagnoses }] = useStateValue();

  const validationSchema = Yup.lazy((values) => {
    switch (values.type) {
      case EntryType.Hospital:
        return Yup.object({
          type: Yup.string().required("Type is required"),
          date: Yup.date().required("Date is required"),
          specialist: Yup.string().required("Specialist is required"),
          description: Yup.string().required("Description is required"),
          diagnosisCodes: Yup.array().of(Yup.string()),
          discharge: Yup.object({
            date: Yup.date().required("Discharge date is required"),
            criteria: Yup.string().required("Criteria is required"),
          }),
        });
      case EntryType.OccupationalHealthcare:
        return Yup.object({
          type: Yup.string().required("Type is required"),
          date: Yup.date().required("Date is required"),
          specialist: Yup.string().required("Specialist is required"),
          description: Yup.string().required("Description is required"),
          diagnosisCodes: Yup.array().of(Yup.string()),
          employerName: Yup.string().required("Employer name is required"),
          sickLeave: Yup.object({
            startDate: Yup.date(),
            endDate: Yup.date(),
          }),
        });
      case EntryType.HealthCheck:
      default:
        return Yup.object({
          type: Yup.string().required("Type is required"),
          date: Yup.date().required("Date is required"),
          specialist: Yup.string().required("Specialist is required"),
          description: Yup.string().required("Description is required"),
          diagnosisCodes: Yup.array().of(Yup.string()),
          healthCheckRating: Yup.number()
            .integer()
            .min(0)
            .max(3)
            .required("Health check rating is required"),
        });
    }
  });

  const typeChange = (type: string) => {
    switch (type) {
      case "Hospital":
        setInitialValues({
          type: EntryType.Hospital,
          ...baseInitialValues,
          discharge: {
            date: "",
            criteria: "",
          },
        });
        break;
      case "OccupationalHealthcare":
        setInitialValues({
          type: EntryType.OccupationalHealthcare,
          ...baseInitialValues,
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: "",
          },
        });
        break;
      case "HealthCheck":
      default:
        setInitialValues({
          type: EntryType.HealthCheck,
          ...baseInitialValues,
          healthCheckRating: 0,
        });
        break;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <TypesField
              name="type"
              label="Type"
              options={typeOptions}
              typeChange={typeChange}
            />
            <Field label="Date" name="date" component={DateField} />
            <Field
              label="Specialist"
              name="specialist"
              placeholder="Specialist"
              component={TextField}
            />
            <Field
              label="Description"
              name="description"
              placeholder="Description"
              component={TextField}
            />
            <DiagnosisSelection
              name="diagnosisCodes"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge date"
                  name="discharge.date"
                  component={DateField}
                />
                <Field
                  label="Diascharge criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Employer"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start"
                  name="sickLeave.startDate"
                  component={DateField}
                />
                <Field
                  label="Sick leave end"
                  name="sickLeave.endDate"
                  component={DateField}
                />
              </>
            )}
            {values.type === "HealthCheck" && (
              <Field
                name="healthCheckRating"
                label="Health check rating"
                min={0}
                max={3}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                component={NumberField}
              />
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ float: "right" }}
                  type="submit"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
