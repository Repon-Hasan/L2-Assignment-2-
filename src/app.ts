import express, { Request, Response } from "express";
import initDb from "./database/dbConnect";
import { userRouter } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.route";
import { vehicleRoutes } from "./modules/vehicles/vehicle.route";
import { bookingRouters } from "./modules/booking/booking.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
initDb();

// Routes
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/auth', authRoutes.router);
app.use("/api/v1",vehicleRoutes.router)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/bookings",bookingRouters.router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
