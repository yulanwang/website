import AlertCard from "./AlertCard";
import BannerCard from "./BannerCard";
import Logo from "./Logo";

export default function MentorAppsBanner() {
  return (
    <div>
      <AlertCard
      title={"Mentor Applications are open!!"}
      body={
        <>
          Apply now for our mentor role for the upcoming Fall 2023 semester!
          Applications close{" "}
          <b className="text-oasis-blue italic">Friday, September 1st</b>.
        </>
      }
      buttonTitle={"Click Here to Apply!"}
      href={
        "https://docs.google.com/forms/d/e/1FAIpQLScRNM6L61jOBsWZZLRXU75EVRcrYAjEFxN-NC6wIHqdwhSW2Q/viewform?usp=sf_link"
      }
    />
    </div>
  );
}
