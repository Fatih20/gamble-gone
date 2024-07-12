import { authOptions } from "../auth/[...nextauth]/auth-options";
import { geolocation } from "@vercel/functions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Get query params
  const searchParams = req.nextUrl.searchParams;
  const rawLimit = searchParams.get("limit") || "6";
  const limit = !isNaN(parseInt(rawLimit)) ? parseInt(rawLimit) : 6;

  // Get user geo location
  let geoloc: typeof NextRequest.prototype.geo;
  if (process.env.NODE_ENV !== "production") {
    // Development (mocked geolocation)
    geoloc = {
      city: "Tangerang Selatan",
      region: "Banten",
      country: "Indonesia",
      latitude: "-6.2884",
      longitude: "106.717",
    };
  } else {
    // Production (real geolocation)
    geoloc = geolocation(req);
    console.log(
      geoloc.city,
      geoloc.country,
      geoloc.latitude,
      geoloc.longitude,
      geoloc.region,
    );
  }
  if (!geoloc || !geoloc.latitude || !geoloc.longitude) {
    return NextResponse.json(
      { message: "Failed to get user location" },
      { status: 400 },
    );
  }

  // Generate search params
  const keywordsArr: string[] = [];
  if (geoloc.country?.toLowerCase() === "ID") {
    keywordsArr.push("Pusat Rehabilitasi");
  } else {
    keywordsArr.push("Rehabilitation Center");
  }
  const keywords = keywordsArr.join(", ");
  console.log(keywords);

  // Radius limit
  const radius = 5000;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY as string;

  // Text search (OLD API)
  // https://developers.google.com/maps/documentation/places/web-service/search-text?hl=en
  // https://maps.googleapis.com/maps/api/place/textsearch/json?query=Pusat Rehabilitasi&key=<REDACTED>&location=-6.30%106.677403&radius=100000

  // Build query URL
  const baseURL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
  const endpoint = new URL(baseURL);
  endpoint.searchParams.append("query", keywords);
  endpoint.searchParams.append("key", apiKey);
  const location = `${geoloc.latitude},${geoloc.longitude}`;
  endpoint.searchParams.append("location", location);
  endpoint.searchParams.append("radius", radius.toString());

  // Get candidate data
  const res = await fetch(endpoint, {
    method: "GET",
  });
  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to get rehab data" },
      { status: 400 },
    );
  }

  // Parse result
  const result = await res.json();
  const data = (result.results as any[]).map((item) => {
    return {
      placeID: item.place_id,
      name: item.name,
      formattedAddress: item.formatted_address,
      rating: item.rating ? item.rating : 0,
      userRatingTotal: item.user_ratings_total ? item.user_ratings_total : 0,
      photos: item.photos
        ? {
            photoReference: item.photos[0].photo_reference,
            height: item.photos[0].height,
            width: item.photos[0].width,
          }
        : null,
    };
  });

  // Get best match
  const bestMatch = data
    // .sort(
    //   (a, b) =>
    //     calcBayesianAverage(b.rating, b.userRatingTotal) -
    //     calcBayesianAverage(a.rating, a.userRatingTotal),
    // )
    .filter((_, idx) => idx < limit);

  // Get photo for each item
  // https://developers.google.com/maps/documentation/places/web-service/photos
  const returnedData = await Promise.all(
    bestMatch.map(async (item) => {
      if (item.photos) {
        const photoEndpoint = new URL(
          "https://maps.googleapis.com/maps/api/place/photo",
        );
        photoEndpoint.searchParams.append("maxwidth", "400");
        photoEndpoint.searchParams.append(
          "photoreference",
          item.photos.photoReference,
        );
        photoEndpoint.searchParams.append("key", apiKey);

        const photoRes = await fetch(photoEndpoint, {
          method: "GET",
        });
        if (!photoRes.ok) {
          return;
        }

        const imageURL = photoRes.url;

        return { ...item, photos: null, imageURL };
      } else {
        return item;
      }
    }),
  );

  return NextResponse.json({ message: "Success", data: returnedData });
};

function calcBayesianAverage(rating: number, totalRating: number) {
  const C = 3;
  const m = 3;
  const bayesianAverage = (C * m + totalRating * rating) / (C + totalRating);
  return bayesianAverage;
}
