import Accordian from "./Accordian"

function AccordianHolder({title, listName}) {

    return (
        <div className="p-1 mt-1 bg-rose-200 rounded-xl">
            <Accordian 
                title={title} 
                content={
                    listName && listName.length > 0 ? (
                        <ul className="mt-4 text-lg">{listName.map((listItem, index) => <li key={index}>{`- ${listItem}`}</li>)}</ul>)
                        :
                        (<p>No items to display</p>)
                }
            />
        </div>
    )
}

export default AccordianHolder