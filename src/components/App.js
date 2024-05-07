import React, { useEffect, useState } from "react";
import * as data from "../data.json";
import * as ymaps from "ymaps";
import Card from "./Card";
import Badge from "./Badge";

const { pickPoints } = data;

const App = () => {
  const [currentPickupPoint, setCurrentPickupPoint] = useState({
    latitude: pickPoints[0]["latitude"],
    longitude: pickPoints[0]["longitude"],
    address: pickPoints[0]["address"],
  });

  let ymap, geoObj;

  useEffect(() => {
    async function createMap() {
      await ymaps.ready(function () {
        ymap = new ymaps.Map("YMapsID", {
          center: [
            currentPickupPoint["latitude"],
            currentPickupPoint["longitude"],
          ],
          zoom: 15,
        });

        geoObj = new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: [
              currentPickupPoint["latitude"],
              currentPickupPoint["longitude"],
            ],
          },
        });

        ymap.geoObjects.add(geoObj);
      });
    }

    createMap();

    return () => {
      ymap.destroy();
      ymap = geoObj = null;
    };
  }, [currentPickupPoint]);

  return (
    <main>
      <section className="card-container" aria-label="pickup pounts">
        {pickPoints.map((pickPoint) => {
          const { latitude, longitude, address, budgets } = pickPoint;

          const pickupPointInfo = {
            latitude,
            longitude,
            address,
          };

          return (
            <Card
              key={address}
              title={address}
              setPickupPoint={setCurrentPickupPoint}
              pickupPointInfo={pickupPointInfo}
              currentPickupPoint={currentPickupPoint}
            >
              {budgets.map((badge) => (
                <Badge className="badge" key={badge}>
                  {badge}
                </Badge>
              ))}
            </Card>
          );
        })}
      </section>
      <section className="map" id="YMapsID" aria-label="map"></section>
    </main>
  );
};

export default App;
