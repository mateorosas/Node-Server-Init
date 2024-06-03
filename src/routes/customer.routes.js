import { Router } from "express";
import {
  createCustomers,
  deleteCustomer,
  editCustomer,
  renderCustomers,
  updateCustomer,
  getProducts,
  getImagePaths
} from "../controllers/customerController.js";
const router = Router();

router.get("/", renderCustomers);
router.post("/add", createCustomers);
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);
router.get("/products", getProducts);


router.get("/images", async (req, res) => {
  try {
    const imageDirectory = path.join(__dirname, 'public/styles/img');
    const imagePaths = await getImagePaths(imageDirectory);
    const imageUrls = imagePaths.map(filePath => path.relative(path.join(__dirname, 'public'), filePath));
    res.json(imageUrls);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Error fetching images');
  }
});

export default router;
