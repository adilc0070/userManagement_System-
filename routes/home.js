const express = require("express");
const router = express.Router();


router.get("/", function (req, res, next) {
  const items = [
    {
      name: "Santorini, Greece",
      image: "https://media.istockphoto.com/id/533978532/photo/santorini-sunset-over-the-village-of-oia-in-greece.jpg?s=612x612&w=0&k=20&c=igKKre_3Ps7mcq4d73F9g5yK_DTbVEtFlX6xjCHAF2I=",
      desc: "The beauty of Santorini leaves an indelible mark on those who visit, making it an unforgettable experience that stays with them forever.",
    },
    {
      name: "Bora Bora, French Polynesia",
      image: "https://etahititravel.com/wp-content/uploads/2019/10/intercontinental-bora-bora-resort-thalasso-spa-etahiti-travel-package.jpg",
      desc: "Bora Bora whispers of romance, adventure, and the untamed beauty of the Earth. It's a place where time seems to stand still, where the outside world fades away, and where the only currency is the tranquility found in each whispering breeze",
    },    
    {
      name: "Amalfi Coast, Italy",
      image: "https://i2.wp.com/mrandmrsluxe.com/wp-content/uploads/2017/02/positano-italy.jpg?resize=736%2C1238",
      desc: "A picturesque coastal region featuring colorful villages, dramatic cliffs, and the stunning Mediterranean Sea.",
    },
    {
      name: "Banff National Park, Canada",
      image:
        "https://www.xtrafondos.com/en/descargar.php?id=160&vertical=1",
      desc: "Offering majestic mountains, turquoise lakes, and diverse wildlife in the heart of the Canadian Rockies.",
    },
    
  ];
  if (req.session.login) {
    res.render("home", { items });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
