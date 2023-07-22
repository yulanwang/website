import AlertCard from "./AlertCard";

export default function MentorAppsAlert() {
  return (
    <div>
      <AlertCard
        title={"Mentor Applications are open!!"}
        body={
          <>
            Apply now for our mentor role for the upcoming Fall 2023 semester! 
            Applications close{" "}
            <em className="text-oasis-blue italic">Friday, Sept 1st</em>.
          </>
        }
        buttonTitle={"Click Here to Apply!"}
        href={
          "https://docs.google.com/forms/d/e/1FAIpQLScRNM6L61jOBsWZZLRXU75EVRcrYAjEFxN-NC6wIHqdwhSW2Q/viewform?usp=sf_link"
        }
        extraButtonTitle={"Learn More"}
        extraButtonHref={
          "/mentor"
        }
      />
    </div>
  );
}
