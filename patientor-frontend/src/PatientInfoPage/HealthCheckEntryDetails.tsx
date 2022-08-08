import { useStateValue } from "../state";
import { Diagnose, HealthCheckEntry } from "../types";
import {
  HealthAndSafety as HealthAndSafetyIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import "./EntryDetails.css";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();

  const getFavoriteColor = (): string => {
    switch (entry.healthCheckRating) {
      case 0:
        return "#98C379";
      case 1:
        return "#e5cd7b";
      case 2:
        return "#e06c75";
      case 3:
        return "#c678dd";
      default:
        return "#000000";
    }
  };

  return (
    <div className="entry">
      <p>
        {entry.date} <HealthAndSafetyIcon />
      </p>
      <p>{entry.description}</p>
      <p>
        <FavoriteIcon style={{ color: getFavoriteColor() }} />
      </p>
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

export default HealthCheckEntryDetails;
