import './ManageQuiz.scss'
import Select from 'react-select'

const ManageQuiz = (props) => {
    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr></hr>
            <div className="add-new">
                


                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add New Quiz</legend>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder='Your Quiz Name...'/>
                        <label>Name Quiz</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder='Create Your Description'/>
                        <label>Description</label>
                    </div>
                    <div className='more-actions'>
                        <label>Upload Image</label>
                        <input type='file'/>
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                table
            </div>
        </div>
    )
}

export default ManageQuiz;