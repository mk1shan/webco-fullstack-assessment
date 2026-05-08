import axios from "axios";
import "dotenv/config";

const sourceData = [
  {
    _id: "abc123",
    title: "Modern 2BR in Parramatta",
    price: 850000,
    suburb: "Parramatta",
    publishedAt: "2025-03-15",
    active: true,
  },
  {
    _id: "def456",
    title: "Luxury Penthouse Sydney CBD",
    price: 2400000,
    suburb: "Sydney",
    publishedAt: "2025-04-01",
    active: true,
  },
];

const DIRECTUS_API =
  "https://directus-instance.com/items/property_listings";

async function migrateData() {
  for (const item of sourceData) {
    const transformedData = {
      external_id: item._id,
      listing_title: item.title,
      asking_price: item.price,
      location: item.suburb,
      date_published: item.publishedAt,
      status: item.active ? "published" : "draft",
    };

    let retryCount = 2;

    while (retryCount >= 0) {
      try {
        await axios.post(
          DIRECTUS_API,
          transformedData,
          {
            headers: {
              Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(
          `SUCCESS: ${item._id} migrated`
        );

        break;
      } catch (error: any) {
        if (retryCount === 0) {
          console.error(
            `FAILED: ${item._id}`,
            error.response?.data || error.message
          );
        } else {
          console.log(
            `Retrying ${item._id}...`
          );
        }

        retryCount--;
      }
    }
  }
}

migrateData();
