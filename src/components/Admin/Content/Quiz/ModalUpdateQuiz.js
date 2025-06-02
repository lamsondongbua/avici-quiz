import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc';
import {toast} from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiServices';
import _ from 'lodash';
import { useTranslation, Trans } from 'react-i18next'

const ModalUpdateQuiz = (props) => {
    const {show, setShow, dataUpdateQuiz, setUpdateDataQuiz, fetchListQuiz} = props;

    const handleClose =() => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        setUpdateDataQuiz({});
    };

    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() =>{
        if (!_.isEmpty(dataUpdateQuiz)){
            //update dữ liệu vào các ô input trong bảng modalupdateuser
            setDescription(dataUpdateQuiz.description);
            setName(dataUpdateQuiz.name);
            setType(dataUpdateQuiz.difficulty);
            setImage("");
            if (dataUpdateQuiz.image){
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
            }
        }
    }, [dataUpdateQuiz])

    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     );
    // };

    const handleUploadImage = (event) =>{
        if (event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])   
        }
        else{
            // setPreviewImage("");
        }
    }

    const handleSubmitCreateQuiz = async() => {
        //validate
        // const isValidEmail = validateEmail(email);
        // if (!isValidEmail) {
        //     toast.error('Invalid email');
        //     return;
        // }


        //post API
        // let data = {
        //     email: email,
        //     password: password,
        //     username: username,
        //     role: role,
        //     userImage: image,
        // }
        //axios.post('http://localhost:8081/api/v1/participant', data) => lỗi do post file ảnh
        
        //do có post cả file (image) nên là phải sử dụng formData chứ ko post API kiểu ở trên
        //do không nên để phần post API vào component nên phần này đưa vào services
        // const data = new FormData();
        // data.append('email',email);
        // data.append('password', password);
        // data.append('username', username);
        // data.append('role', role);
        // data.append('userImage', image);

        let data = await putUpdateQuizForAdmin(dataUpdateQuiz.id,name,description,type,image)
        console.log('tạo thành công');
        if (data && data.EC === 0 ){
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers();
            // props.setCurrentPage(1);
             await fetchListQuiz();
        }
        if (data && data.EC !== 0){
            toast.error(data.EM);
        }
    }

    

  return (
    <>
        <Modal 
            show={show} 
            onHide={handleClose} 
            size='xl'
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Update a quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">ID</label>
                        <input type="text" className="form-control" value={dataUpdateQuiz.id} disabled={true}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" value={description} onChange={(event) =>setDescription(event.target.value)}/>
                    </div>
                    
                    {/* <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div> */}
                    <div className="col-md-4">
                        <label className="form-label">Type</label>
                        <select className="form-select" value={type} onChange={(event) => setType(event.target.value)}>
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                    </div>

                    <div className='col-md-12'>
                        <label className='form-label label-upload upload-image-hover' htmlFor='labelUpload'> <FcPlus/> Upload File Image</label>
                        <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)}/>
                    </div>

                    <div className='col-md-12 img-preview'>
                        {previewImage ? <img src={previewImage}/> : <span>Preview Image</span> }
                        
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitCreateQuiz()}>
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ModalUpdateQuiz;
