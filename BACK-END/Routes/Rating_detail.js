// routes.js

const { Router } = require("express");
const router = Router();
const {
  ReadDetail_rating,
  
  ReadByIdPlaces,
  ReadByIdHotels,
  ReadByIdActivitys,
  ReadByIdRestaurants,

  
  Read_Avg_rating,
  Read_Avg_ratingHotels,
  Read_Avg_ratingActivitys,
  Read_Avg_ratingRestaurants,


  Insertplace,
  Inserthotels,
  Insertactivitys,
  InsertRestaurants,

  Update,
  Remove,
  ReadRating,
  GetRatingById,
  GetRatingHotelsById,
  LoadRatingRestauransById,
  GetRatingActivityById,

} = require("../controllers/Rating_detail_contro");

router.get("/detail_rating", ReadDetail_rating); // แก้ไขตรงนี้
router.get("/rating", ReadRating); // แก้ไขตรงนี้

router.get("/detail_rating/:id", ReadByIdPlaces);
router.get("/detail_rating_hotels/:id", ReadByIdHotels);
router.get("/detail_rating_activitys/:id", ReadByIdActivitys);
router.get("/detail_rating_restaurants/:id", ReadByIdRestaurants);

router.post("/detail_rating", Insertplace);
router.post("/detail_rating_hotels", Inserthotels);
router.post("/detail_rating_activitys", Insertactivitys);
router.post("/detail_rating_restaurants", InsertRestaurants);


router.put("/detail_rating/:id", Update);


router.delete("/detail_rating/:id", Remove);

router.post("/GetRatingById",GetRatingById);
router.post("/GetRatingHotelsById",GetRatingHotelsById);
router.post("/GetRatingRestaurantsById",LoadRatingRestauransById);

router.post("/GetRatingActivityById", GetRatingActivityById);

// Avg rating
router.get("/avg_rating_place/:id", Read_Avg_rating);
router.get("/avg_rating_hotels/:id", Read_Avg_ratingHotels);
router.get("/avg_rating_activitys/:id", Read_Avg_ratingActivitys);
router.get("/avg_rating_Restaurants/:id", Read_Avg_ratingRestaurants);

module.exports = router;
