import { useStateValue } from "../state";
import { Diagnose, OccupationalHealthcareEntry } from "../types";
import { Work as WorkIcon } from "@mui/icons-material";
import "./EntryDetails.css";

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div className="entry">
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>{entry.description}</p>
      <p></p>
      {entry?.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnoseName = Object.values(diagnoses).find(
              (d: Diagnose) => d.code === code
            )?.name;

            return (
              <li key={code}>
                {code} {diagnoseName}
              </li>
            );
          })}
        </ul>
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
