import './Share.scss'
import './History.scss'
import PerfectScrollbar from 'react-perfect-scrollbar'

const History = () => {
    return (
        <div className='scroll-container history-container'>
            <PerfectScrollbar>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Total Questions</th>
                            <th scope="col">Total Correct</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                        <tr>
                            <th scope="row">7</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                        <tr>
                            <th scope="row">8</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                        <tr>
                            <th scope="row">9</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                        <tr>
                            <th scope="row">10</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                        </tr>
                    </tbody>
                </table>
            </PerfectScrollbar>
        </div>
    )
}

export default History;