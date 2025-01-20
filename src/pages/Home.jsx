import According from "../components/according/According"
import HomeArticle from "../components/article/HomeArticle"
import NewsLetter from "../components/newsLetter/NewsLetter"
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
      {/* article section  */}
      <HomeArticle></HomeArticle>
      {/* article section  */}
      {/* newsletter  section*/}
      <NewsLetter></NewsLetter>
      {/* newsletter  section*/}
      {/* According section */}
      <According></According>
      {/* According section */}
    </div>
  )
}

export default Home
