import { redirect } from "next/navigation";
import { route } from "../_components/routing";

export default function PortfolioEntry() {
  redirect(route("en"));
}
