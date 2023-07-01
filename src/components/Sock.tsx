export default function Sock() {
  return (
    <div className=" text-oasis-blue flex flex-row gap-6 py-32 justify-center">
      <div className="flex flex-col gap-2 max-w-md w-2/3">
        <h2 className="text-3xl">Join our mailing list!</h2>
        <p>
          Sign up to get the latest updates on Oasis, including application
          dates for both mentors and participants.
        </p>
      </div>
      <div className="w-1/3 grid grid-cols-7 md:grid-rows-2 grid-rows-3 gap-1 ">
        <p className="text-xl col-start-1 col-span-full row-start-1 flex flex-row items-end">
          Enter your email:
        </p>
        <input
          className="row-start-2 col-start-1 col-span-full md:col-span-5 p-2 rounded-lg hover:ring-2 transition-all duration-150 shadow-sm outline-oasis-green ring-oasis-green"
          type="email"
          placeholder="oasisneu@gmail.com"
        />
        <button className="row-start-3 md:row-start-2 md:col-end-7 hover:shadow-md shadow-sm text-oasis-green hover:ring-2 transition-all duration-150 hover:ring-oasis-green bg-oasis-extra-light font-bold p-2 px-4 rounded-lg w-fit">
          Submit
        </button>
      </div>
    </div>
  );
}
