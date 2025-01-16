import PopularSection from "../components/PopularSection/PopularSection"
import Slider from "../components/Slider"


const Home = () => {
  return (
    <div className="dark:text-light3">
      <Slider></Slider>
      <PopularSection></PopularSection>
    </div>
  )
}

export default Home
