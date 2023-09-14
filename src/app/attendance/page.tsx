import { redirect } from "next/navigation";
export default function AttendanceRedirect() {
  redirect(
    "https://docs.google.com/forms/d/e/1FAIpQLSeVeOgeSQ-9ylxub0xHYyHh20XCJ1OX0IHTZrV_7DxxOohqgg/viewform"
  );
}
