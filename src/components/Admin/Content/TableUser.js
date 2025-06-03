import { useTranslation, Trans } from 'react-i18next'

const TableUser = (props) =>{
    const { t } = useTranslation();

    const {listUsers} = props;

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t('table_user.id')}</th>
                        <th scope="col">{t('table_user.username')}</th>
                        <th scope="col">{t('table_user.email')}</th>
                        <th scope="col">{t('table_user.role')}</th>
                        <th scope="col">{t('table_user.action')}</th>
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
                                        <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(item.id)}>{t('table_user.view')}</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(item)}>{t('table_user.update')}</button>
                                        <button className="btn btn-danger" onClick={() => {props.handleClickBtnDelete(item)}}>{t('table_user.delete')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>{t('table_user.no_data')}</td>
                        </tr>
                    }    
                </tbody>
            </table>
        </>
    )
}

export default TableUser;