const express = require('express');
const upload = require('../middlewares/upload');
const { uploadToS3 } = require('../config/s3Config');
const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Error uploading image
 */
router.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const imageUrl = await uploadToS3(file);
    res.status(200).send({ url: imageUrl });
  } catch (error) {
    res.status(500).send('Error uploading image');
  }
});

module.exports = router;
