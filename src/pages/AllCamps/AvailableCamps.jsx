
import CampCard from "../../components/CampCard/CampCard"
import useCamps from "../../hooks/useCamps"

const AvailableCamps = () => {

    const [camps] = useCamps()
    return (
        <div className="dark:text-light2 py-10">
            
            <div className="grid md:grid-cols-4 gap-5">
                {camps?.map(item => <CampCard camp={item} key={item._id}></CampCard>)}
            </div>
        </div>
    )
}

export default AvailableCamps
