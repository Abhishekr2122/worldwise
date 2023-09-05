// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./Form.module.css";
import { Button } from "./Button";
import { BackButton } from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isGeolocationLoading, setISGeolocationLoading] = useState(false);
  const [error, setError] = useState("");
  const { createCity, setCities, isLoading } = useCities();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!lat && !lng) {
        return;
      }
      async function fetchCityData() {
        try {
          setISGeolocationLoading(true);
          setError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem to be a city.Click somewhere else😅"
            );
          }

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
        } catch (err) {
          setError(err.message);
        } finally {
          setISGeolocationLoading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (isGeolocationLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Message message={error} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);

    navigate("/app/cities");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={function (e) {
            setCityName(e.target.value);
          }}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={function (date) {
            setDate(date);
          }}
          selected={date}
          dateFormat="dd/MM/yyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
