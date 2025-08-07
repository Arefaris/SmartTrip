var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import e from "express";
import { createPlan } from "./models/planModel";
const app = e();
app.use(e.json()); // body parser for post requests
const PORT = 5001; //TODO: add port from env
// Test database connection
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
app.post("/api/plan", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield createPlan(req.body);
    res.json({ message: "got it" });
}));
