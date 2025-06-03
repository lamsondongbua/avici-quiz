import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc';
import {toast} from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiServices';
import _ from 'lodash';
import { useTranslation, Trans } from 'react-i18next'

const ModalUpdateQuiz = (props) => {
    const { t } = useTranslation();
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
                <Modal.Title>{t('modalUpdateQuiz.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">{t('modalUpdateQuiz.id')}</label>
                        <input type="text" className="form-control" value={dataUpdateQuiz.id} disabled={true}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('modalUpdateQuiz.name')}</label>
                        <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">{t('modalUpdateQuiz.description')}</label>
                        <input type="text" className="form-control" value={description} onChange={(event) =>setDescription(event.target.value)}/>
                    </div>
                    
                    {/* <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div> */}
                    <div className="col-md-4">
                        <label className="form-label">{t('modalUpdateQuiz.type')}</label>
                        <select className="form-select" value={type} onChange={(event) => setType(event.target.value)}>
                            <option value="EASY">{t('modalUpdateQuiz.easy')}</option>
                            <option value="MEDIUM">{t('modalUpdateQuiz.medium')}</option>
                            <option value="HARD">{t('modalUpdateQuiz.hard')}</option>
                        </select>
                    </div>

                    <div className='col-md-12'>
                        <label className='form-label label-upload upload-image-hover' htmlFor='labelUpload'> <FcPlus/>{t('modalUpdateQuiz.upload')}</label>
                        <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)}/>
                    </div>

                    <div className='col-md-12 img-preview'>
                        {previewImage ? <img src={previewImage}/> : <span>{t('modalUpdateQuiz.preview')}</span> }
                        
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('modalUpdateQuiz.close')}
                </Button>
                <Button variant="primary" onClick={() => handleSubmitCreateQuiz()}>
                    {t('modalUpdateQuiz.save')}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ModalUpdateQuiz;
