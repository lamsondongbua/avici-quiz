import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc';
import {toast} from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';
import _ from 'lodash';
import { useTranslation, Trans } from 'react-i18next'

const ModalUpdateUser = (props) => {
    const {show, setShow, dataUpdate, resetUpdateData} = props;

    const handleClose =() => {
        setShow(false)
        setEmail ("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        resetUpdateData();
    };

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() =>{
        if (!_.isEmpty(dataUpdate)){
            //update dữ liệu vào các ô input trong bảng modalupdateuser
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image){
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleUploadImage = (event) =>{
        if (event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])   
        }
        else{
            // setPreviewImage("");
        }
    }

    const handleSubmitCreateUser = async() => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }


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

        let data = await putUpdateUser(dataUpdate.id,username, role, image)
        console.log('tạo thành công');
        if (data && data.EC === 0 ){
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUsers();
            // props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(props.currentPage);
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
            className='modal-add-user'
        >
            <Modal.Header closeButton>
                <Modal.Title>Update a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} disabled onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} disabled onChange={(event) =>setPassword(event.target.value)}/>
                    </div>
                    
                    <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Role</label>
                        <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    <div className='col-md-12'>
                        <label className='form-label label-upload' htmlFor='labelUpload'> <FcPlus/> Upload File Image</label>
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
                <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ModalUpdateUser;
