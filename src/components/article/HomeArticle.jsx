

const HomeArticle = () => {
    return (
        <div>
            <div className="p-5 mx-auto sm:p-10 md:p-16 ">
                <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                    <img src="https://i.ibb.co.com/PhJ9DFp/portrait-female-pediatrician-work-2-150.jpg" alt="" className="w-full h-60 sm:h-96 object-cover" />
                    <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50 dark:text-dark3">
                        <div className="space-y-2">
                            <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">Participants are advised to bring previous medical records if available</a>
                            <p className="text-xs dark:text-gray-600">By
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">Shakil Ahmed</a>
                            </p>
                        </div>
                        <div className="dark:text-gray-800">
                            <p>Insert the detailed description of the medical camp here, including the activities planned, purpose of the camp, and any special guests or services offered.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeArticle
