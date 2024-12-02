export interface IBus extends Document {
  licensePlate: string;
  busModel: string;
  capacity: number;
  status: "service" | "out of service" | "maintenance";
}
