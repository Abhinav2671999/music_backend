const express = require("express");
const app = express();
require("dotenv/config")

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("server side mai sab shi chalra hai .....")
})

// user authantication routs
const useRoute = require("./routes/auth");
app.use("/api/users/", useRoute);

// artist routs
const artistRoutes = require("./routes/artist");
app.use("/api/artists/", artistRoutes);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
    .once("open", () => console.log("connected"))
    .on("error", (error) => {
        console.log(`ERROR:${error}`);
    })

app.listen(4000, () => console.log("Listening to port 4000"));