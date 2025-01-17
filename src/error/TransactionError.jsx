

const TransactionError = () => {
    return (
        <div>
            <div
                className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl dark:text-light3">
                <img src="https://i.ibb.co/z8VbyRc/Charco-Mobile-Life.png" alt="empty/image"
                    className="w-full sm:w-[200px]" />

                <h1 className="text-[1.4rem] mt-6 font-[500] ">No transactions yet</h1>

                <p className="text-[0.9rem] "> Make Your First Transfer</p>
            </div>
        </div>
    )
}

export default TransactionError

