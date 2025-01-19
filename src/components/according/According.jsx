
import { useState } from "react";

// icons
import { FaChevronDown } from "react-icons/fa6";

const According = () => {
    const [isAccordingOpen, setIsAccordingOpen] = useState(0);

    // according data
    const accordingData = [
        {
            title: "What is the purpose of a Medical Camp Management System?",
            description:
                "A Medical Camp Management System simplifies the organization and participation process for medical camps, ensuring seamless coordination between organizers and participants.",
        },
        {
            title: "Why is participant-centered design important in MCMS?",
            description:
                "Participant-centered design ensures that the system addresses the needs and preferences of users, enhancing the overall experience and encouraging engagement.",
        },
        {
            title: "What role does data visualization play in MCMS?",
            description:
                "Data visualization in MCMS helps participants and organizers gain insights through charts and analytics, making data-driven decisions easier and more effective.",
        },
        {
            title: `Define the term "responsive design" in the context of MCMS.`,
            description: `Responsive design in MCMS ensures the platform adapts to various devices like mobiles, tablets, and desktops, providing an optimal user experience across all screens.`,
        },
        {
            title: `What is the significance of feedback and ratings in MCMS?`,
            description: `Feedback and ratings allow participants to share their experiences, helping organizers improve the quality of future medical camps and build trust within the community.`,
        },
    ];    

    const handleClick = (index) =>
        setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

    return (
        <div className="flex gap-3 flex-col w-full mt-10">
            <p className='text-center text-4xl font-bold my-10'>What you want to know</p>
            {accordingData?.map((according, index) => (
                <article key={index} className="border-b border-[#e5eaf2] rounded py-3">
                    <div
                        className="flex gap-2 cursor-pointer items-center justify-between w-full"
                        onClick={() => handleClick(index)}>
                        <h2 className="text-[#3B9DF8] font-[600] text-[1.2rem]">
                            {according.title}
                        </h2>
                        <p>
                            <FaChevronDown
                                className={`text-[1.2rem] text-[#424242] transition-all duration-300 ${isAccordingOpen === index && "rotate-[180deg] !text-[#3B9DF8]"
                                    }`}
                            />
                        </p>
                    </div>
                    <div
                        className={`grid transition-all duration-300 overflow-hidden ease-in-out ${isAccordingOpen === index
                            ? "grid-rows-[1fr] opacity-100 mt-4"
                            : "grid-rows-[0fr] opacity-0"
                            }`}>
                        <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                            {according.description}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default According;
