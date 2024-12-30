import FlakeId from "flake-idgen";
import intformat from "biguint-format";
import { env } from "./env.js";

// number between 0 to 1023
const machineId: number = env.MACHINE_ID;

// number used to reduce value of a generated timestamp; cannot exceed 1970-01-01T00:00:00Z
const epoch: number = env.EPOCH;

const flakeIdGen: FlakeId = new FlakeId({ id: machineId, epoch });

// TO PRESERVE THE PRECISION OF THE GENERATED INTEGER, MAKE SURE
// NOT TO CONVERT IT AS A NUMBER TYPE
export const snowflake = () => intformat(flakeIdGen.next(), "dec");