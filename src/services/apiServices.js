import instance from '../utils/axiosCustomize'

const postCreateNewUser = (email,password,username, role, image) => {

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return instance.post('api/v1/participant', data);
}

const getAllUsers = () => {
    return instance.get('api/v1/participant/all');
}


const putUpdateUser = (id,username, role, image) => {
    // dùng với form data trên POSTMAN
    const data = new FormData();
    data.append('id',id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return instance.put('api/v1/participant', data);
}


const deleteUser = (userId) => {
    return instance.delete('api/v1/participant', {data :{id: userId}});
}

const getUserWithPaginate = (page, limit) => {
    return instance.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (userEmail, userPassword) =>{
    return instance.post(`/api/v1/login`, {email: userEmail, password: userPassword, delay: 5000})
}

const postRegister = (email, password, username) => {
    return instance.post(`/api/v1/register`, {email, password, username})
}

const getQuizByUser = () =>{
    return instance.get('/api/v1/quiz-by-participant')
}

const getDataQuiz = (id) =>{
    return instance.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    //truyền theo kiểu raw trên POSTMAN
    return instance.post(`/api/v1/quiz-submit`, {...data})
}

const postCreateNewQuiz = (description, namequiz, difficulty,quizImage) =>{
    const data = new FormData();
    data.append('description',description);
    data.append('name', namequiz);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return instance.post('api/v1/quiz', data);
}

const getAllQuizForAdmin = () => {
    return instance.get(`/api/v1/quiz/all`);
}

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) =>{
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name',name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return instance.put('api/v1/quiz',data);
}

const deleteQuizForAdmin = (id) => {
    return instance.delete(`/api/v1/quiz/${id}`);
}
export {postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postRegister,getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin, putUpdateQuizForAdmin, deleteQuizForAdmin}