import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useTranslation, Trans } from 'react-i18next'


const TableUserPaginate = (props) =>{
    const { t } = useTranslation();
    const {listUsers, pageCount} = props;

    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(Number(event.selected) + 1);
        props.setCurrentPage(Number(event.selected + 1))
        console.log(`User requested page number ${event.selected}`);
      };
    

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t('table_user_paginate.id')}</th>
                        <th scope="col">{t('table_user_paginate.username')}</th>
                        <th scope="col">{t('table_user_paginate.email')}</th>
                        <th scope="col">{t('table_user_paginate.role')}</th>
                        <th>{t('table_user_paginate.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item,index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(item.id)}>{t('table_user_paginate.view')}</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(item)}>{t('table_user_paginate.update')}</button>
                                        <button className="btn btn-danger" onClick={() => {props.handleClickBtnDelete(item)}}>{t('table_user_paginate.delete')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>{t('table_user_paginate.no_data')}</td>
                        </tr>
                    }    
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel={t('table_user_paginate.pagination_next')}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel={t('table_user_paginate.pagination_previous')}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={Math.max(0, props.currentPage - 1)}
                />
            </div>
        </>
    )
}

export default TableUserPaginate;