export default function Sock() {
  return (
    <div
      className={
        "text-oasis-blue flex sm:flex-row flex-col gap-6 py-32 w-full justify-center items-center sm:items-start"
      }
    >
      <div className="flex flex-col gap-2 sm:w-2/3 w-full items-center sm:items-start">
        <h2 className="text-3xl">Join our mailing list!</h2>
        <p className="text-center sm:text-left">
          Sign up to get the latest updates on Oasis, including application
          dates for both mentors and participants.
        </p>
      </div>
      <div className="sm:w-1/3 grid grid-cols-7 md:grid-rows-2 grid-rows-3 gap-1 w-full">
        <p className="text-xl col-start-1 col-span-full row-start-1 flex flex-row items-end justify-center md:justify-start">
          Enter your email:
        </p>
        <input
          className="row-start-2 col-start-1 col-span-full mx-auto md:mx-0 md:min-w-0 min-w-[14rem] md:col-span-5 p-2 rounded-lg hover:ring-2 transition-all duration-150 shadow-sm outline-oasis-green ring-oasis-green max-w-[16rem]"
          type="email"
          placeholder="oasisneu@gmail.com"
        />
        <button className="row-start-3 md:row-start-2 md:col-end-7 hover:shadow-md shadow-sm text-oasis-green hover:ring-2 transition-all duration-150 hover:ring-oasis-green bg-oasis-extra-light font-bold p-2 px-4 rounded-lg col-span-7 mx-auto md:mx-0 md:col-start-auto w-fit">
          Submit
        </button>
      </div>
    </div>
  );
}
