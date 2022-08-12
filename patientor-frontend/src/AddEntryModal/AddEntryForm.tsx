import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { useStateValue } from "../state";
import { EntryFormValues, HospitalEntry } from "../types";
import { DateField, DiagnosisSelection, TextField } from "./FormField";
import * as Yup from "yup";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
	// const nowDate = new Date();

  const initialValues: Omit<HospitalEntry, "id"> = {
    type: "Hospital",
    date: "",
    specialist: "",
    description: "",
    diagnosisCodes: undefined,
    discharge: {
      date: "",
      criteria: "",
    },
  };

  const validationSchema = Yup.object({
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              name="type"
              placeholder="Hospital"
              component={TextField}
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
