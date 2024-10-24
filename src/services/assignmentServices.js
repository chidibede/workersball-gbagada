import { sendEmail } from "./emailjs";
import supabase from "./supabase";

// Array of 130 unique colors (you can replace with actual color values)
// const colors = [
//   "Red",
//   "Orange",
//   "Yellow",
//   "Green",
//   "Blue",
//   "Indigo",
//   "Violet",
//   "Pink",
//   "Brown",
//   "Gray",
//   "Black",
//   "White",
//   "Crimson",
//   "Coral",
//   "Salmon",
//   "Turquoise",
//   "Teal",
//   "Lime",
//   "Olive",
//   "Maroon",
//   "Gold",
//   "Silver",
//   "Bronze",
//   "Lavender",
//   "Peach",
//   "Mint",
//   "Periwinkle",
//   "Navy",
//   "Cyan",
//   "Magenta",
//   "Aqua",
//   "Fuchsia",
//   "Emerald",
//   "Amber",
//   "Mustard",
//   "Beige",
//   "Ivory",
//   "Charcoal",
//   "Slate",
//   "Sienna",
//   "Chestnut",
//   "Rose",
//   "Lilac",
//   "Raspberry",
//   "Plum",
//   "Tan",
//   "Khaki",
//   "Wheat",
//   "Cocoa",
//   "Burgundy",
//   "Seafoam",
//   "Sky Blue",
//   "Electric Blue",
//   "Royal Blue",
//   "Cerulean",
//   "Lemon",
//   "Honey",
//   "Cantaloupe",
//   "Tangerine",
//   "Papaya",
//   "Cherry",
//   "Firebrick",
//   "Tomato",
//   "Peony",
//   "Mauve",
//   "Orchid",
//   "Pine",
//   "Juniper",
//   "Apple",
//   "Pea",
//   "Fern",
//   "Cactus",
//   "Emerald Green",
//   "Jade",
//   "Sea Green",
//   "Honeydew",
//   "Blush",
//   "Basil",
//   "Mint Cream",
//   "Ivory",
//   "Cotton Candy",
//   "Steel Blue",
//   "Dusty Rose",
//   "Lavender Blush",
//   "Sea Mist",
//   "Slate Gray",
//   "Ash",
//   "Pewter",
//   "Copper",
//   "Brass",
//   "Cream",
//   "Almond",
//   "Toffee",
//   "Sage",
// ];

// export const eastAuditorium = [
//   "Chili",
//   "Zucchini",
//   "Grape",
//   "Sunflower",
//   "Maple",
//   "Pineapple",
//   "Marigold",
//   "Citrus",
//   "Raisin",
//   "Turf Green",
//   "Shamrock",
//   "Cool Gray",
//   "Warm Gray",
//   "Peach Puff",
//   "Light Coral",
//   "Rosy Brown",
//   "Dark Salmon",
//   "Light Sea Green",
//   "Medium Violet Red",
//   "Deep Sky Blue",
//   "Dark Khaki",
//   "Light Goldenrod Yellow",
//   "Pale Goldenrod",
//   "Light Salmon",
//   "Light Slate Gray",
//   "Light Steel Blue",
//   "Powder Blue",
//   "Pale Green",
//   "Medium Sea Green",
//   "Medium Spring Green",
//   "Medium Orchid",
// ];

const maxSeats = 1300;
const maxTables = 100;

const eastMaxSeats = 300
const eastMaxTables = 30;

async function getLatestTableAndSeat() {
  const { data, error } = await supabase
    .from("workertables")
    .select("*")
    .order("tablenumber", { ascending: false })
    .order("seatnumber", { ascending: false })
    .limit(1);

  console.log({ data });

  if (error) {
    console.error("Error fetching latest table and seat number:", error);
    return { tableNumber: 1, seatNumber: 1 };
  }

  if (data.length === 0) {
    return { tableNumber: 1, seatNumber: 1 };
  }

  const latest = data[0];
  let { tablenumber: tableNumber, seatnumber: seatNumber } = latest;

  seatNumber++;
  if (seatNumber > 10) {
    seatNumber = 1;
    tableNumber++;
  }

  return { tableNumber, seatNumber };
}

async function getLatestTableAndSeatForInactive() {
  const { data, error } = await supabase
    .from("workertablesinactive")
    .select("*")
    .order("tablenumber", { ascending: false })
    .order("seatnumber", { ascending: false })
    .limit(1);

  console.log({ data });

  if (error) {
    console.error("Error fetching latest table and seat number:", error);
    return { tableNumber: 1, seatNumber: 1 };
  }

  if (data.length === 0) {
    return { tableNumber: 1, seatNumber: 1 };
  }

  const latest = data[0];
  let { tablenumber: tableNumber, seatnumber: seatNumber } = latest;

  seatNumber++;
  if (seatNumber > 10) {
    seatNumber = 1;
    tableNumber++;
  }

  return { tableNumber, seatNumber };
}

export async function generateWorkerId(workerId, email, name) {
  const { tableNumber, seatNumber } = await getLatestTableAndSeat();

  const totalSeatsAssigned = (tableNumber - 1) * 10 + seatNumber;

  if (totalSeatsAssigned > maxSeats) {
    console.log("Maximum seat limit reached.");
    return;
  }

  if (tableNumber > maxTables) {
    console.log("Maximum table limit reached.");
    return;
  }

  const mainColor = "blue"
  

  const code = `${mainColor}-${tableNumber}-${seatNumber}`;

  await supabase.from("worker").update({ code }).eq("id", workerId);

  const { error } = await supabase.from("workertables").insert({
    workerid: code,
    color: mainColor,
    tablenumber: tableNumber,
    seatnumber: seatNumber,
  });

  if (error) {
    console.error("Error inserting worker ID:", error);
    throw error;
  }

  await sendEmail(name, email, code, 'active');

  console.log(`Worker ID ${workerId} generated and inserted successfully!`);
}

export async function generateInActiveWorkerId(workerId, email, name) {
  const { tableNumber, seatNumber } = await getLatestTableAndSeatForInactive();

  const totalSeatsAssigned = (tableNumber - 1) * 10 + seatNumber;

  if (totalSeatsAssigned > eastMaxSeats) {
    console.log("Maximum seat limit reached.");
    return;
  }

  if (tableNumber > eastMaxTables) {
    console.log("Maximum table limit reached.");
    return;
  }

  const eastColor = "Gold"

  const code = `${eastColor}-${tableNumber}-${seatNumber}`;

  await supabase.from("worker").update({ code }).eq("id", workerId);

  const { error } = await supabase.from("workertablesinactive").insert({
    workerid: code,
    color: eastColor,
    tablenumber: tableNumber,
    seatnumber: seatNumber,
  });

  if (error) {
    console.error("Error inserting worker ID:", error);
    throw error;
  }

  await sendEmail(name, email, code, 'inactive');

  console.log(`Worker ID ${workerId} generated and inserted successfully!`);
}