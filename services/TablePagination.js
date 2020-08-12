
import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export const TablePagination = ({
    pagesCount,
    currentPage,
    paginate,
    handlePreviousClick,
    handleNextClick,
    postsPerPage
}) => {
  const  pageNumbers = [];
    for (let i = 1; i<= Math.ceil(pagesCount / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <Pagination>
                <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink onClick={handlePreviousClick} previous href="#" />
                </PaginationItem>
                {pageNumbers.map(number => 
                    <PaginationItem active={number === currentPage ? true :  false} key={number}>
                        <PaginationLink onClick={e => paginate(e, number)} href="#">
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                )}
                 <PaginationItem disabled={currentPage === pageNumbers.length}>
                    <PaginationLink onClick={handleNextClick} next href="#" />
                </PaginationItem>
            </Pagination>
            
        </div>
    )
}
