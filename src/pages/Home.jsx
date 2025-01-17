import PopularSection from "../components/PopularSection/PopularSection"
import ReviewSection from "../components/Review/ReviewSection"
import Slider from "../components/Slider"


const Home = () => {
  return (
    <div className="dark:text-light3">
      <Slider></Slider>
      <PopularSection></PopularSection>
      {/* review section */}
      <ReviewSection></ReviewSection>
      {/* review section */}
    </div>
  )
}

export default Home
