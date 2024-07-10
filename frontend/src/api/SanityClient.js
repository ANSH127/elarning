import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";


export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: true,
});

export const builder = ImageUrlBuilder(client);
