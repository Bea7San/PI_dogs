import React from "react";

export default function Paginate({ dogsPerPage, allDogs, paginate, currentPage }) {
    //const pageNumber = [];
    const totalPages = Math.ceil(allDogs / dogsPerPage);

    // for (let i = 1; i < totalPages + 1; i++) {
    //     pageNumber.push(i);
    // }
    const prevNext = ['<', '>'];

    const showOnly = (range) => {
        let showOnly = [currentPage];
        for (let i = 1; i <= range; i++) {
            if (currentPage - i >= 1) showOnly.unshift(currentPage - i);
            if (currentPage + i <= totalPages) showOnly.push(currentPage + i);
        }
        return showOnly;
    };
    

    return (
        <nav>
            <ul className='InARow' >
                <li>
                    <button onClick={() => paginate(1)}>First</button>
                </li>
                <li>
                    <button onClick={() => currentPage > 1 ? paginate(currentPage - 1) : paginate(currentPage)}>{prevNext[0]}</button>
                </li>

                {
                    showOnly(3)?.map(page => (
                        <li className="Page" key={page}>
                            <button onClick={() => paginate(page)}>{page}</button>
                        </li>
                    ))
                }
                <li>
                    <button onClick={() => currentPage < totalPages ? paginate(currentPage + 1) : paginate(currentPage)}>{prevNext[1]}</button>
                </li>
                <li>
                    <button onClick={() => paginate(totalPages)}>Last</button>
                </li>
            </ul>
        </nav>
    )
}


