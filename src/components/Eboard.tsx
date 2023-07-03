import Image from "next/image";

export default function Eboard() {
  return (
    <div className="w-full pt-20">
      <h1 className="">Our Team</h1>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8">
        {[
          {
            name: "Frank Anderson",
            role: "Co-Director",
            src: "https://media.licdn.com/dms/image/C5603AQE4cFVm1SqYVA/profile-displayphoto-shrink_400_400/0/1619473083418?e=1694044800&v=beta&t=OsnukuN1UNawaMzGeUmKFS98rE20gU2L9zqBkynfk2M",
          },
          {
            name: "Sama Zaki",
            role: "Co-Director",
            src: "https://media.licdn.com/dms/image/D4E03AQE5J8ppdIAqvg/profile-displayphoto-shrink_400_400/0/1674609169174?e=1694044800&v=beta&t=Fw40zg0EdBV7q0mxy2xTJ9Cer-9kcrZgy_rwcSKJymg",
          },
          {
            name: "Rei Masuya",
            role: "Brand Designer",
            src: "https://media.licdn.com/dms/image/C4D03AQGGDCMyVe9oaw/profile-displayphoto-shrink_400_400/0/1663201359913?e=1694044800&v=beta&t=WdDVU2dnzr3UrQekk7hhTSruSjcS4BuuDX17yteweVk",
          },
          {
            name: "Mahima Ramesh",
            role: "Program Coordinator",
            src: "https://media.licdn.com/dms/image/C4E03AQEfuwR093BwoA/profile-displayphoto-shrink_400_400/0/1659146927821?e=1694044800&v=beta&t=W_LRM-CRS-GjISMCchLMndVsO1Pkxo4CjYqfKShsOZs",
          },
          {
            name: "Allen Lin",
            role: "Mentor Lead",
            src: "https://media.licdn.com/dms/image/D4E03AQG-mtpC03TCYQ/profile-displayphoto-shrink_400_400/0/1673326565124?e=1694044800&v=beta&t=XC00zLk6FzYOcqTk3IFlRJOLFU6X8wE8jNvCFwQaDW4",
          },
          {
            name: "Laith Taher",
            role: "Events Director",
            src: "https://media.licdn.com/dms/image/D4E03AQECes9egjScKw/profile-displayphoto-shrink_400_400/0/1668552656586?e=1694044800&v=beta&t=LNNNVXFMaGa36fNqeW0T5PJ7H2Mtwl_QfpEPkCGEQzA",
          },
          {
            name: "Caitlin Flynn",
            role: "Operations Director",
            src: "https://media.licdn.com/dms/image/D5603AQFRJFAPnl4Ntg/profile-displayphoto-shrink_400_400/0/1675653304238?e=1694044800&v=beta&t=WzXPo7CSkjXQEDn6nefxmSwhLQo6HIlIKHVfla2SrTI",
          },
          { name: "Isha Chadalavada", role: "Marketing Director", src: "" },
        ].map(({ name, role, src }, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image
              className="rounded-md shadow-md mb-2"
              src={src}
              alt={"Profile Image for " + name}
              width={160}
              height={160}
            />
            <h3>{name}</h3>
            <p>{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
