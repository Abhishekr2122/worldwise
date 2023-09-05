import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={function (e) {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; back
    </Button>
  );
}
