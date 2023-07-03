export default function OasisNumbers() {
  return (
    <div className="flex flex-col items-center pt-8">
      <h1 className="text-6xl mb-8">By the Numbers</h1>
      <div className="max-w-3xl grid grid-rows-2 grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 gap-8 items-center justify-center">
        {[
          { count: 75, content: "Total Oasis Projects" },
          { count: 278, content: "Total Oasis Participants" },
          { count: 73, content: "Participants this Semester" },
          { count: 0, content: "Projects this Semester" },
        ].map((obj, i) => (
          <div
            key={i}
            className="bg-oasis-extra-light rounded-3xl flex flex-col items-center justify-center max-w-md w-full p-4 h-48 shadow-md"
          >
            <h2 className="text-oasis-yellow text-6xl mb-2">{obj.count}</h2>
            <p className="text-oasis-blue text-center">{obj.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
