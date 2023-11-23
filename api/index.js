require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Cities = require("./models/Cities");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/cities", async (req, res) => {
	try {
		const data = await Cities.find({});
		res.json(data);
	} catch (err) {
		res.status(500).json({ err: "An error while fetching cities." });
	}
});

app.get("/cities/:id", async (req, res) => {
	try {
		const idParam = req.params.id;
		const data = await Cities.findOne({ _id: idParam });
		res.json(data);
	} catch (err) {
		res.status(500).json({ err: "An error while fetching cities." });
	}
});

app.post("/cities", async (req, res) => {
	try {
		const newCity = new Cities({
			cityName: req.body.cityName,
			country: req.body.country,
			countryCode: req.body.countryCode,
			date: req.body.date,
			notes: req.body.notes,
			position: { lat: req.body.position.lat, lng: req.body.position.lng },
		});
		await Cities.create(newCity);
		res.json(newCity);
	} catch (err) {
		console.log(err);
		res.status(500).json({ err: "An error while fetching data" });
	}
});

app.delete("/cities/:id", async (req, res) => {
	const cityId = req.params.id;
	try {
		await Cities.deleteOne({ _id: cityId });
		res.json("How dare you!");
	} catch (err) {
		res.json(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server start on por t: ${PORT}`);
});
