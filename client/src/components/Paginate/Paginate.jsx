import './paginate.css'
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
            <div className='pagesB' >
                <div className="Page">
                    {currentPage !== 1 && <button className={currentPage===1? 'currentPage flb':'pagebutton flb'} onClick={() => paginate(1)}>First</button>}
                </div>
                <div className="Page">
                    {currentPage !== 1 && <button className={currentPage===1? 'currentPage':'pagebutton'} onClick={() => currentPage > 1 ? paginate(currentPage - 1) : paginate(currentPage)}>{prevNext[0]}</button>}
                </div>

                {
                    showOnly(3)?.map(page => (
                        <div className="Page" key={page}>
                            <button className={currentPage===page ? 'currentPage' :'pagebutton'} value={page} onClick={() => paginate(page)}>{page}</button>
                        </div>
                    ))
                }
                <div className="Page">
                    {currentPage !== totalPages && <button className={currentPage===totalPages? 'currentPage' :'pagebutton'} onClick={() => currentPage < totalPages ? paginate(currentPage + 1) : paginate(currentPage)}>{prevNext[1]}</button>}
                </div>
                <div className="Page">
                    {currentPage !== totalPages && <button className={currentPage===totalPages? 'currentPage flb' :'pagebutton flb'} onClick={() => paginate(totalPages)}>Last</button>}
                </div>
            </div>
        </nav>
    )
}


