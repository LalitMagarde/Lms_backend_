// const express = require('express');
// const router = express.Router();

// module.export = router;


// router.post("/upload", async (req, res) => {
//   try {
//     const file = req.files.image; 
//     const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.data.toString('base64')}`
//     )
  
//     // { imageUrl: result.secure_url };

//     res.json({ success: true, url: result.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });