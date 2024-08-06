import { TicketWithDriver } from "../types/ticket";

export const MOCK_TICKETS: TicketWithDriver[] = [
  {
    id: 1,
    date: "cze 8, 2024",
    number: "226-veh-697-2024",
    vehiclePlate: "MLY-Q84E",
    currency: "PLN",
    amount: 200,
    postPayoutDate: "sie 26, 2024",
    driver: {
      id: 1,
      name: "Jacek",
      surname: "Nowak",
    },
    driverId: 1,
  },
  {
    id: 2,
    date: "cze 26, 2024",
    number: "710-oqp-852-2024",
    vehiclePlate: "OPA-V95N",
    currency: "PLN",
    amount: 200,
    postPayoutDate: "maj 5, 2024",
    driver: {
      id: 1,
      name: "Jacek",
      surname: "Nowak",
    },
    driverId: 1,
  },
  {
    id: 3,
    date: "sie 8, 2024",
    number: "985-hdj-882-2024",
    vehiclePlate: "BFR-Q45N",
    currency: "PLN",
    amount: 500,
    postPayoutDate: "sie 24, 2024",
    driverId: 2,
    driver: {
      id: 2,
      name: "Daniel",
      surname: "Twardowski",
    },
  },
  {
    id: 4,
    date: "cze 8, 2024",
    number: "748-lae-589-2024",
    vehiclePlate: "YHS-C10J",
    currency: "PLN",
    amount: 500,
    postPayoutDate: "lip 20, 2024",
    driverId: 3,
    driver: {
      id: 3,
      name: "Łukasz",
      surname: "Kruk",
    },
  },
  {
    id: 5,
    date: "maj 9, 2024",
    number: "169-jmy-094-2024",
    vehiclePlate: "EZZ-H35D",
    currency: "EUR",
    amount: 200,
    postPayoutDate: "sie 8, 2024",
    driverId: 1,
    driver: {
      id: 1,
      name: "Jacek",
      surname: "Nowak",
    },
  },
  {
    id: 6,
    date: "lip 8, 2024",
    number: "362-rvp-801-2024",
    vehiclePlate: "GPH-T17Z",
    currency: "EUR",
    amount: 100,
    postPayoutDate: "maj 5, 2024",
    driverId: 2,
    driver: {
      id: 2,
      name: "Daniel",
      surname: "Twardowski",
    },
  },
  {
    id: 7,
    date: "cze 26, 2024",
    number: "058-gxs-190-2024",
    vehiclePlate: "VXU-U84L",
    currency: "EUR",
    amount: 200,
    postPayoutDate: "cze 26, 2024",
    driverId: 3,
    driver: {
      id: 3,
      name: "Łukasz",
      surname: "Kruk",
    },
  },
  {
    id: 8,
    date: "lip 8, 2024",
    number: "959-wlz-099-2024",
    vehiclePlate: "BFP-N46U",
    currency: "PLN",
    amount: 200,
    postPayoutDate: "maj 5, 2024",
    driverId: 2,
    driver: {
      id: 2,
      name: "Daniel",
      surname: "Twardowski",
    },
  },
  {
    id: 9,
    date: "maj 19, 2024",
    number: "680-ohj-716-2024",
    vehiclePlate: "IDR-H50E",
    currency: "CZK",
    amount: 500,
    postPayoutDate: "cze 24, 2024",
    driverId: 1,
    driver: {
      id: 1,
      name: "Jacek",
      surname: "Nowak",
    },
  },
  {
    id: 10,
    date: "sie 1, 2024",
    number: "794-kqk-542-2024",
    vehiclePlate: "EAG-F87M",
    currency: "CZK",
    amount: 500,
    postPayoutDate: "cze 11, 2024",
    driverId: 3,
    driver: {
      id: 3,
      name: "Łukasz",
      surname: "Kruk",
    },
  },
];