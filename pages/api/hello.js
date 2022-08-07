// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  console.log("api call");
  let origin = req.body.origin;
  let destination = req.body.destination;
  console.log(origin, destination);

  const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=metrics&key=${process.env.apiKey}`;

  axios
    .get(URL)
    .then((response) => {
      console.log(response.data["rows"][0]["elements"][0]["distance"]["text"]);
      res.json({
        distance: response.data["rows"][0]["elements"][0]["distance"]["text"],
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
