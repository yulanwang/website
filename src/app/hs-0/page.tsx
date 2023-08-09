import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Image from "next/image";

/*
 * You've made it to the Hack Session 0 page! This is the page that is displayed when you visit https://oasisneu.com/hs-0
 *
 * If you're stuck, ask questions! Step by step directions can be found here -> _____
 */

// Change your group's data here!
const members = [
  {
    name: "Laith Taher",
    major: "Computer Science",
    graduatingYear: "2026",
    image:
      "https://media.licdn.com/dms/image/D4E03AQECes9egjScKw/profile-displayphoto-shrink_800_800/0/1668552656586?e=1695859200&v=beta&t=lKPz_Un65g6Hn1ZCdtmoKV2bS86bOAj-r1ilxHjT-kQ",
  },
];

// The only code that should be changed below this line is on line 51.
export default function HS0() {
  return (
    <div className="bg-oa-light">
      <NavBar active="" />
      <div className="flex flex-col justify-start mt-8 mb-12">
        <h1 className="mx-auto">🌴 Hack Session 0 🌴</h1>
        <h3 className=" mx-auto mb-12 text-4xl">Git-ting Started</h3>
        <div className="mx-auto flex content-center justify-center pt-6">
          <div className="grid justify-center gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8">
            {members.map((member) => (
              <div
                key={member.name}
                className="flex h-[110px] w-[310px] flex-col rounded-lg border border-oa-yellow p-2 bg-oa-yellow-pastel"
              >
                <div className="flex items-center mt-2 mb-2">
                  <Image
                    className="h-20 w-20 rounded-full ml-2"
                    src={member.image}
                    alt={member.name}
                    width={40}
                    height={40}
                  />
                  <div className="ml-3">
                    <div className="font-bold text-xl">{member.name}</div>
                    <div>{member.graduatingYear}</div>
                    <p className="text-md">{member.major}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
