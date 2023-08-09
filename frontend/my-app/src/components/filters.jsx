import { useState } from "react";

export default function Filters({ filtersNames, setFilter }) {
    const [selectedFilter, setSelectedFilter] = useState('tous');

    function filterProjects(filter) {
        setFilter(filter)
        setSelectedFilter(filter);
    }

    return (
        <div className='filters-projects'>
            <div>
                <button className={selectedFilter === 'tous' ? 'filters selected-filter' : 'filters'} onClick={() => filterProjects('tous')} id='tous'>Tous</button>
            </div>
            {filtersNames.map(name => (
                <div className="language" key={name + 'filters'}>
                    <button onClick={() => filterProjects(name)} id={name} className={selectedFilter === name ? 'filters selected-filter' : 'filters'}>{name}</button>
                </div>
            ))}
        </div>
    )
}