import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const START_MAP = `https://www.google.com/maps/embed/v1/place?key=${process.env.apiKey}&q=Pune,India`;

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(0);

  const MAP_URL = `https://www.google.com/maps/embed/v1/directions?key=${process.env.apiKey}&origin=${origin}
    &destination=${destination}&avoid=tolls|highways`;

  const [map, setMap] = useState(START_MAP);

  const calculateDistance = async () => {
    console.log("sending request to api");
    setMap(MAP_URL);

    const res = await fetch(`/api/hello`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: origin,
        destination: destination,
      }),
    });

    const data = await res.json();
    if (data) {
      console.log(data);
      setDistance(data.distance);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Graviti</title>
        <meta
          name="description"
          content="Calculate distance from origin to destination"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}>
          <div>
            <Image src="/logo.png" alt="Logo" width="160px" height="75px" />
            <div className={styles.navs}></div>
          </div>
        </div>
        <div className={styles.details}>
          <span>
            <p>
              Lets calculate <b>distance</b> from Google Maps.
            </p>
          </span>
          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <div className={styles.inputContainer}>
                {/* <FontAwesomeIcon icon="fa-solid fa-location-dot" /> */}
                <input
                  type="text"
                  id="origin"
                  placeholder="start point"
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.btn} onClick={calculateDistance}>
                  Calculate
                </button>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="destination"
                  placeholder="end point"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className={styles.distancebox}>
                <div className={styles.distanceHead}>
                  <div>Distance</div>
                  <div>
                    <span>{distance}</span>
                  </div>
                </div>
                <div className={styles.distanceTail}>
                  <p>
                    The distance between <b>{origin}</b> and{" "}
                    <b>{destination}</b> is {distance}s.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.contentRight}>
              <iframe
                width="500px"
                height="500px"
                frameBorder="0"
                referrerPolicy="no-referrer-when-downgrade"
                src={MAP_URL}
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
